use num_complex::Complex;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Mandelbrot {
    pixel_steps: Vec<u32>,
    pixels_count: usize,
}

/// 2^2
const ESCAPE_MODULUS: f64 = 4.0;
/// complex zero
const Z0: Complex<f64> = Complex::new(0.0, 0.0);

const IS_IN: u32 = 0;

#[wasm_bindgen]
impl Mandelbrot {
    pub fn new(pixels_count: usize) -> Self {
        Self {
            pixel_steps: vec![0; pixels_count],
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
    /// * `depth` - Number of iterations
    pub fn calc(&mut self, lx: f64, rx: f64, yc: f64, w: u16, h: u16, depth: u32) {
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
            self.pixel_steps[i] = check_series(lx + xd / scale, ty - yd / scale, depth);
        }
    }

    pub fn pixel_steps(&self) -> *const u32 {
        self.pixel_steps.as_ptr()
    }
}

fn check_series(x: f64, i: f64, depth: u32) -> u32 {
    if check_cardioid(x, i) {
        return IS_IN;
    }

    let point = Complex::new(x, i);
    let mut num = Z0 + point;

    for step in 0..depth {
        // do not calculate square root
        if num.norm_sqr() >= ESCAPE_MODULUS {
            return step;
        }

        num = num.powu(2) + point;
    }

    IS_IN
}

fn check_cardioid(x: f64, i: f64) -> bool {
    let a4 = x - 0.25;
    let b2 = i * i;
    let q = a4 * a4 + b2;

    let x = x + 1.0;

    // cardioid or circle to the left of cardioid
    (q * (q + a4) < b2 * 0.25) || (x * x + b2 < 1.0 / 16.0)
}
