const test1 = {
  file1: {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  },
  file2: {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  },
  result: '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}',
};

export default test1;
