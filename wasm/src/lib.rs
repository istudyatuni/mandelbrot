use num_complex::Complex;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Mandelbrot {
    /// colors of pixels, for now 0 and 255
    pixels: Vec<f32>,
    pixels_count: usize,
}

/// modulo
const R: f64 = 2.0;
/// number of iterations
const N: u16 = 100;
/// complex zero
const Z0: Complex<f64> = Complex::new(0.0, 0.0);

const IS_IN: f32 = 0.0;

#[wasm_bindgen]
impl Mandelbrot {
    pub fn new(pixels_count: usize) -> Self {
        Self {
            pixels: vec![0.0; pixels_count],
            pixels_count,
        }
    }

    /// Calculate mandelbrot plane for given parameters for each pixel on plane
    ///
    /// Plane is from JS canvas:
    ///
    /// ```
    /// --------------> x
    /// |
    /// |
    /// v
    ///
    /// y
    /// ```
    ///
    /// We made projection of complex plane to canvas plane.
    ///
    /// # Arguments
    ///
    /// * `lx` - Left coordinate of x axis (complex plane)
    /// * `rx` - Right coordinate of x axis (complex plane)
    /// * `w` - Width of display (canvas plane) - how many points to calculate
    /// * `h` - Height of display (canvas plane)
    pub fn calc(&mut self, lx: f64, rx: f64, w: u16, h: u16) {
        // total width of x axis (complex plane)
        let xwidth = rx - lx;

        // scale coefficient between complex plane and canvas
        let scale = (w as f64) / xwidth;

        // height of y axis
        let yheight = (h as f64) / scale;

        // top and down y coordinate
        // now hardcode, y axis on canvas center
        let ty = yheight / (2 as f64);
        // let dy = ty;

        // x display, y display
        let (mut xd, mut yd);

        for i in 0..self.pixels_count {
            xd = (i % w as usize) as f64;
            yd = (i / w as usize) as f64;
            self.pixels[i] = check_series(lx + xd / scale, ty - yd / scale);
        }
    }

    pub fn pixels(&self) -> *const f32 {
        self.pixels.as_ptr()
    }

    pub fn scale2x() {
        unimplemented!();
    }
}

fn check_series(x: f64, i: f64) -> f32 {
    if check_cardioid(x, i) {
        return IS_IN;
    }

    let point = Complex::new(x, i);
    let mut num = Z0 + point;

    for step in 0..N {
        if num.norm() >= R {
            // calculate percent of step
            return step as f32 / N as f32;
        }

        num = num.powu(2) + point;
    }

    return IS_IN;
}

fn check_cardioid(x: f64, i: f64) -> bool {
    let a4 = x - 0.25;
    let b2 = i * i;
    let q = a4 * a4 + b2;

    // cardioid
    if q * (q + a4) < b2 * 0.25 {
        return true;
    }

    let x = x + 1.0;

    // circle to the left of cardioid
    if x * x + b2 < 1.0 / 16.0 {
        return true;
    }

    return false;
}
