use std::hint::black_box as bb;

use criterion::{Criterion, criterion_group, criterion_main};

use mandelbrot_wasm::Mandelbrot;

const W: u16 = 1600;
const H: u16 = 752;

fn benchmark(mut m: Mandelbrot, a: f64, b: f64, c: f64) {
    m.calc(bb(a), bb(b), bb(c), bb(W), bb(H), bb(256));
}

fn criterion_benchmark(c: &mut Criterion) {
    // lx=-0.13852233886718768&rx=-0.13754577636718768&yc=0.8637609863281248
    c.bench_function("calc fully black", |b| {
        b.iter(|| {
            benchmark(
                Mandelbrot::new(W as usize * H as usize),
                -0.13852233886718768,
                -0.13754577636718768,
                0.8637609863281248,
            )
        })
    });
    c.bench_function("calc main view", |b| {
        b.iter(|| benchmark(Mandelbrot::new(W as usize * H as usize), -3.0, 1.0, -2.0))
    });
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
