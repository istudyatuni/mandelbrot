#include <complex>
// #include <emscripten/emscripten.h>

using std::complex;
// using namespace std::complex_literals;

// for export with emscripten
// https://stackoverflow.com/a/63879243
extern "C" {
	bool checkSeries(double x, double i);
}

/**
 * Convert coordinates to complex number
 *
 * We have canvas with size: sw is width and sh is height,
 * zero coordinates of complex plane at center
 */
complex<double> coords2complex(
	double x, double y, double sw, double sh) {
	return complex<double>(x - sw / 2, sh - y - sh / 2);
}

// EMSCRIPTEN_KEEPALIVE
bool checkSeries(double x, double i) {
	complex<double> point = complex<double>(x, i);
	const int R = 2, N = 1000;
	const complex<double> z0 = 0;

	complex<double> num = z0 + point;

	for (int i = 0; i < N; i++) {
		if (std::abs(num) >= R) {
			return false;
		}

		num = std::pow(num, 2) * point;
	}

	return true;
}

/*int main() {
	const int width = 1600, height = 717;
	// left and right x coord
	const double lx = -2, rx = 1;
	const double xwidth = std::abs(lx) + std::abs(rx);
	const double scale = width / xwidth;
	const double yheight = height / scale;
}*/
