const aif = require('./');

const tests = [
  ['1', cb => {
    aif(true,      cb => cb('IF'     ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['0', cb => {
    aif(false,     cb => cb('IF'     ))
    .finally(res => cb(assertIsUndefined(res)));
  }],
  
  ['11', cb => {
    aif    (true,  cb => cb('IF'     ))
    .elseIf(true,  cb => cb('ELSEIF1'))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['10', cb => {
    aif    (true,  cb => cb('IF'     ))
    .elseIf(false, cb => cb('ELSEIF1'))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['01', cb => {
    aif    (false, cb => cb('IF'     ))
    .elseIf(true,  cb => cb('ELSEIF1'))
    .finally(res => cb(assertEquals(res, 'ELSEIF1')));
  }],
  ['00', cb => {
    aif    (false, cb => cb('IF'     ))
    .elseIf(false, cb => cb('ELSEIF1'))
    .finally(res => cb(assertIsUndefined(res)));
  }],
  
  ['111', cb => {
    aif    (true,  cb => cb('IF'     ))
    .elseIf(true,  cb => cb('ELSEIF1'))
    .elseIf(true,  cb => cb('ELSEIF2'))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['110', cb => {
    aif    (true,  cb => cb('IF'     ))
    .elseIf(true,  cb => cb('ELSEIF1'))
    .elseIf(false, cb => cb('ELSEIF2'))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['101', cb => {
    aif    (true,  cb => cb('IF'     ))
    .elseIf(false, cb => cb('ELSEIF1'))
    .elseIf(true,  cb => cb('ELSEIF2'))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['100', cb => {
    aif    (true,  cb => cb('IF'     ))
    .elseIf(false, cb => cb('ELSEIF1'))
    .elseIf(false, cb => cb('ELSEIF2'))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['011', cb => {
    aif    (false, cb => cb('IF'     ))
    .elseIf(true,  cb => cb('ELSEIF1'))
    .elseIf(true,  cb => cb('ELSEIF2'))
    .finally(res => cb(assertEquals(res, 'ELSEIF1')));
  }],
  ['010', cb => {
    aif    (false, cb => cb('IF'     ))
    .elseIf(true,  cb => cb('ELSEIF1'))
    .elseIf(false, cb => cb('ELSEIF2'))
    .finally(res => cb(assertEquals(res, 'ELSEIF1')));
  }],
  ['001', cb => {
    aif    (false, cb => cb('IF'     ))
    .elseIf(false, cb => cb('ELSEIF1'))
    .elseIf(true,  cb => cb('ELSEIF2'))
    .finally(res => cb(assertEquals(res, 'ELSEIF2')));
  }],
  ['000', cb => {
    aif    (false, cb => cb('IF'     ))
    .elseIf(false, cb => cb('ELSEIF1'))
    .elseIf(false, cb => cb('ELSEIF2'))
    .finally(res => cb(assertIsUndefined(res)));
  }],
  
  ['1   w/ else', cb => {
    aif  (true,    cb => cb('IF'     ))
    .else(         cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['0   w/ else', cb => {
    aif  (false,   cb => cb('IF'     ))
    .else(         cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  
  ['11  w/ else', cb => {
    aif    (true,  cb => cb('IF'     ))
    .elseIf(true,  cb => cb('ELSEIF1'))
    .else(         cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['10  w/ else', cb => {
    aif    (true,  cb => cb('IF'     ))
    .elseIf(false, cb => cb('ELSEIF1'))
    .else  (       cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['01  w/ else', cb => {
    aif    (false, cb => cb('IF'     ))
    .elseIf(true,  cb => cb('ELSEIF1'))
    .else(         cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSEIF1')));
  }],
  ['00  w/ else', cb => {
    aif    (false, cb => cb('IF'     ))
    .elseIf(false, cb => cb('ELSEIF1'))
    .else  (       cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  
  ['111 w/ else', cb => {
    aif    (true,  cb => cb('IF'     ))
    .elseIf(true,  cb => cb('ELSEIF1'))
    .elseIf(true,  cb => cb('ELSEIF2'))
    .else  (       cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['110 w/ else', cb => {
    aif    (true,  cb => cb('IF'     ))
    .elseIf(true,  cb => cb('ELSEIF1'))
    .elseIf(false, cb => cb('ELSEIF2'))
    .else  (       cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['101 w/ else', cb => {
    aif    (true,  cb => cb('IF'     ))
    .elseIf(false, cb => cb('ELSEIF1'))
    .elseIf(true,  cb => cb('ELSEIF2'))
    .else  (       cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['100 w/ else', cb => {
    aif    (true,  cb => cb('IF'     ))
    .elseIf(false, cb => cb('ELSEIF1'))
    .elseIf(false, cb => cb('ELSEIF2'))
    .else  (       cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['011 w/ else', cb => {
    aif    (false, cb => cb('IF'     ))
    .elseIf(true,  cb => cb('ELSEIF1'))
    .elseIf(true,  cb => cb('ELSEIF2'))
    .else  (       cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSEIF1')));
  }],
  ['010 w/ else', cb => {
    aif    (false, cb => cb('IF'     ))
    .elseIf(true,  cb => cb('ELSEIF1'))
    .elseIf(false, cb => cb('ELSEIF2'))
    .else  (       cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSEIF1')));
  }],
  ['001 w/ else', cb => {
    aif    (false, cb => cb('IF'     ))
    .elseIf(false, cb => cb('ELSEIF1'))
    .elseIf(true,  cb => cb('ELSEIF2'))
    .else  (       cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSEIF2')));
  }],
  ['000 w/ else', cb => {
    aif    (false, cb => cb('IF'     ))
    .elseIf(false, cb => cb('ELSEIF1'))
    .elseIf(false, cb => cb('ELSEIF2'))
    .else  (       cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  
  ['1  w/ function test', cb => {
    aif    (() => true,  cb => cb('IF'     ))
    .else  (             cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['0  w/ function test', cb => {
    aif    (() => false, cb => cb('IF'     ))
    .else  (             cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  ['01 w/ function test', cb => {
    aif    (() => false, cb => cb('IF'     ))
    .elseIf(() => true,  cb => cb('ELSEIF1'))
    .else  (             cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSEIF1')));
  }],
  ['00 w/ function test', cb => {
    aif    (() => false, cb => cb('IF'     ))
    .elseIf(() => false, cb => cb('ELSEIF1'))
    .else  (             cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  
  ['truethy bool', cb => {
    aif      (true, cb => cb('IF'     ))
    .else    (      cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['truethy num', cb => {
    aif      (1, cb => cb('IF'     ))
    .else    (   cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['truethy str', cb => {
    aif      ('a', cb => cb('IF'     ))
    .else    (     cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['truethy obj', cb => {
    aif      ({}, cb => cb('IF'     ))
    .else    (    cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['falsey bool', cb => {
    aif      (false, cb => cb('IF'     ))
    .else    (       cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  ['falsey num', cb => {
    aif      (0, cb => cb('IF'     ))
    .else    (   cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  ['falsey str', cb => {
    aif      ('', cb => cb('IF'     ))
    .else    (     cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  ['falsey null', cb => {
    aif      (null, cb => cb('IF'     ))
    .else    (      cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  ['falsey undefined', cb => {
    aif      ({}.a, cb => cb('IF'     ))
    .else    (      cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  
  ['truethy bool w/ function test', cb => {
    aif      (() => true, cb => cb('IF'     ))
    .else    (            cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['truethy num w/ function test', cb => {
    aif      (() => 1, cb => cb('IF'     ))
    .else    (         cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['truethy str w/ function test', cb => {
    aif      (() => 'a', cb => cb('IF'     ))
    .else    (           cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['truethy obj w/ function test', cb => {
    aif      (() => ({}), cb => cb('IF'     ))
    .else    (            cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'IF')));
  }],
  ['falsey bool w/ function test', cb => {
    aif      (() => false, cb => cb('IF'     ))
    .else    (             cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  ['falsey num w/ function test', cb => {
    aif      (() => 0, cb => cb('IF'     ))
    .else    (         cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  ['falsey str w/ function test', cb => {
    aif      (() => '', cb => cb('IF'     ))
    .else    (          cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  ['falsey null w/ function test', cb => {
    aif      (() => null, cb => cb('IF'     ))
    .else    (            cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  ['falsey undefined w/ function test', cb => {
    aif      (() => ({}.a), cb => cb('IF'     ))
    .else    (              cb => cb('ELSE'   ))
    .finally(res => cb(assertEquals(res, 'ELSE')));
  }],
  
  ['else else failure', cb => {
    cb(assertThrows(() => {
      aif(true, () => {})
      .else(() => {})
      .else(() => {});
    }));
  }],
  ['else elseIf failure', cb => {
    cb(assertThrows(() => {
      aif(true, () => {})
      .else(() => {})
      .elseIf(() => {});
    }));
  }],
  ['finally else failure', cb => {
    cb(assertThrows(() => {
      aif(true, () => {})
      .finally(() => {})
      .else(() => {});
    }));
  }],
  ['finally elseIf failure', cb => {
    cb(assertThrows(() => {
      aif(true, () => {})
      .finally(() => {})
      .elseIf(() => {});
    }));
  }],
  ['finally finally failure', cb => {
    cb(assertThrows(() => {
      aif(true, () => {})
      .finally(() => {})
      .finally(() => {});
    }));
  }],
  
  ['if non-function str failure', cb => {
    cb(assertThrows(() => {
      aif(true, 'a');
    }));
  }],
  ['if non-function obj failure', cb => {
    cb(assertThrows(() => {
      aif(true, {});
    }));
  }],
  ['if non-function null failure', cb => {
    cb(assertThrows(() => {
      aif(true, null);
    }));
  }],
  ['if non-function undefined failure', cb => {
    cb(assertThrows(() => {
      aif(true);
    }));
  }],
  ['elseif non-function failure', cb => {
    cb(assertThrows(() => {
      aif(true, () => {})
      .elseIf(true, 'a');
    }));
  }],
  ['else non-function failure', cb => {
    cb(assertThrows(() => {
      aif(true, () => {})
      .else('a');
    }));
  }],
  ['finally non-function failure', cb => {
    cb(assertThrows(() => {
      aif(true, () => {})
      .finally('a');
    }));
  }],
];


function assertEquals(a, b) {
  if (a === b) {
    return null;
  }
  return `${a} !== ${b}`;
}
function assertIsUndefined(a) {
  if (typeof a === 'undefined') {
    return null;
  }
  return `${a} is not undefined`;
}
function assertThrows(fn) {
  let exceptionThrown = false;
  try {
    fn();
  }
  catch(err) {
    exceptionThrown = true;
  }
  
  if (exceptionThrown) {
    return null;
  }
  return `Expected uncaught exception. No expection thrown.`;
}

function runTestsRecusive(i, cb) {
  if (i >= tests.length) {
    return cb();
  }
  
  const [name, testFn] = tests[i];
  
  console.log(`Running test: ${name}`);
  testFn(err => {
    if (err) {
      return cb(`Test "${name}" (${i + 1}) failed.\n${err}`);
    }
    
    return runTestsRecusive(i + 1, cb);
  });
}

runTestsRecusive(0, err => {
  if (err) {
    console.error(err);
    return process.exit(1);
  }
  
  console.log('All tests passed');
  return process.exit(0);
});