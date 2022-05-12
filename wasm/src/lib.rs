use num_complex::Complex;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Mandelbrot {
    pixel_colors: Vec<u16>,
    pixels_count: usize,
}

const ESCAPE_MODULUS: f64 = 2.0;
/// number of iterations
const DEPTH: u16 = 100;
/// complex zero
const Z0: Complex<f64> = Complex::new(0.0, 0.0);

const IS_IN: u16 = 0;

#[wasm_bindgen]
impl Mandelbrot {
    pub fn new(pixels_count: usize) -> Self {
        Self {
            pixel_colors: vec![0; pixels_count],
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
    /// * `yc` - Center of y axis (complex plane)
    /// * `w` - Width of display (canvas plane) - how many points to calculate
    /// * `h` - Height of display (canvas plane)
    pub fn calc(&mut self, lx: f64, rx: f64, yc: f64, w: u16, h: u16) {
        // total width of x axis (complex plane)
        let xwidth = rx - lx;

        // scale coefficient between complex plane and canvas
        let scale = (w as f64) / xwidth;

        // complex height of y axis
        let yheight = (h as f64) / scale;

        // top complex y coordinate
        let ty = yc + (yheight / 2.0);

        // x display, y display
        let (mut xd, mut yd);

        for i in 0..self.pixels_count {
            xd = (i % w as usize) as f64;
            yd = (i / w as usize) as f64;
            self.pixel_colors[i] = check_series(lx + xd / scale, ty - yd / scale);
        }
    }

    pub fn pixel_colors(&self) -> *const u16 {
        self.pixel_colors.as_ptr()
    }
}

fn check_series(x: f64, i: f64) -> u16 {
    if check_cardioid(x, i) {
        return IS_IN;
    }

    let point = Complex::new(x, i);
    let mut num = Z0 + point;

    for step in 0..DEPTH {
        if num.norm() >= ESCAPE_MODULUS {
            return step;
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
