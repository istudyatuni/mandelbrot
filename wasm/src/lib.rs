use num_complex::Complex;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Mandelbrot {
    /// color of pixel, for now 0 and 255
    pixels: Vec<u8>,
}

/// modulo
const R: i8 = 2;
/// number of iterations
const N: i16 = 100;
/// complex zero
const Z0: Complex<f64> = Complex::new(0.0, 0.0);

const IS_IN: u8 = 255;
const IS_NOT_IN: u8 = 0;

#[wasm_bindgen]
impl Mandelbrot {
    pub fn new(pixels_count: usize) -> Self {
        Self {
            pixels: vec![0; pixels_count],
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
    pub fn calc(&mut self, lx: f64, rx: f64, w: u16, h: u16, len: usize) {
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

        for i in 0..len {
            xd = (i % w as usize) as f64;
            yd = (i / w as usize) as f64;
            self.pixels[i] = check_series(lx + xd / scale, ty - yd / scale);
        }
    }

    pub fn pixels(&self) -> *const u8 {
        self.pixels.as_ptr()
    }

    pub fn scale2x() {
        unimplemented!();
    }
}

fn check_series(x: f64, i: f64) -> u8 {
    if check_cardioid(x, i) {
        return IS_IN;
    }

    let point = Complex::new(x, i);
    let mut num = Z0 + point;

    for _ in 0..N {
        if num.norm() >= R as f64 {
            return IS_NOT_IN;
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
