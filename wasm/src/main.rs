fn main() {}

#[test]
fn benchmark() {
    use std::time::Instant;

    use mandelbrot_wasm::Mandelbrot;

    const W: usize = 1600;
    const H: usize = 752;

    let mut m = Mandelbrot::new(W * H);

    let now = Instant::now();

    // fully black 'lx=-0.13852233886718768&rx=-0.13754577636718768&yc=0.8637609863281248' ~ 4.5s
    m.calc(
        -0.13852233886718768,
        -0.13754577636718768,
        0.8637609863281248,
        W as u16,
        H as u16,
        256,
    );

    let elapsed = now.elapsed();
    println!("Elapsed: {:.2?}", elapsed);
}
