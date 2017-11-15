/**
 * @typedef {boolean|function}        test
 * @typedef {{(cb:function) => void}} execFunction
 * @typedef {{(...args) => void}}     finallyFunction
 */

/**
 * If the given test evaluates to true, the given function is executed.
 * @param {test}         test Value or function to evaluate.
 * @param {execFunction} fn   Function to execute. First argument is the callback.
 */
module.exports = function asyncIf(test, fn) {
  if (!isFunction(fn)) throw new Error(`'if' second arg is not a function (type: ${getFriendlyType(fn)}).`);
  
  // create a new logic tree and add the if statement
  const logicTree = new AsyncLogicTree();
  logicTree.ifStatements.push(new AsyncIfStatement(test, fn));
  
  // process the logic tree on the next tick to allow the logic tree to be
  // built up first
  process.nextTick(() => processLogicTree(logicTree));
  
  // return the logic tree builder
  return new AsyncLogicTreeBuilderIf(logicTree);
};

/**
 * Processes and evaluates the statements in the given logic tree and
 * executes the appropriate functions.
 * @param {AsyncLogicTree} logicTree Logic tree to process.
 */
function processLogicTree(logicTree) {
  // find the first if statement that evaluates to true
  const trueIfStatement = logicTree.ifStatements.find(ifStatement => ifStatement.evalTest());
  
  // execute the if statement's function or the else function
  let cbCalled = false;
  const execFn = trueIfStatement? trueIfStatement.fn : logicTree.elseFn;
  (execFn || noopCB)((...args) => {
    
    // ensure the callback is only called once
    if (cbCalled) throw new Error('callback already called.');
    cbCalled = true;
    
    // execute the finally function (pass through all given arguments)
    if (logicTree.finallyFn) {
      logicTree.finallyFn(...args);
    }
  });
}





/**
 * Represents an if statement with a test and a corresponding function.
 */
class AsyncIfStatement {
  /**
   * Creates a new if statement.
   * @param {test}         test Test to evaluate.
   * @param {execFunction} fn   Function to execute if the test passes.
   */
  constructor(test, fn) {
    this.test = test;
    this.fn   = fn;
  }
  
  /**
   * Evaluates this if statement's test to determain if it passes. If `test` is
   * a function then it is executed and the return value is used. Otherwise the
   * value of `test` is used. If the value is truethy then the test passes.
   * @returns {boolean} If the test passes (`true`) or not (`false`).
   */
  evalTest() {
    const val = isFunction(this.test)? this.test() : this.test;
    return val? true : false;
  }
}

/**
 * Represents a logical tree of if, elseIf, else, and finally statements.
 */
class AsyncLogicTree {
  /**
   * Creates a new logic tree.
   */
  constructor() {
    /** @type {AsyncIfStatement[]} */ this.ifStatements = [];
    /** @type {execFunction}       */ this.elseFn       = null;
    /** @type {finallyFn}          */ this.finallyFn    = null;
  }
}

/**
 * Interface to build logic tree after an else statement. Only "finally"
 * is allowed after "else".
 */
class AsyncLogicTreeBuilderElse {
  /**
   * Creates a new "else" interface.
   * @param {AsyncLogicTree} logicTree Logic tree to build on.
   */
  constructor(logicTree) {
    /** @private */ this.logicTree = logicTree;
  }
  
  /**
   * The given function is always executed and is executed last. Arguments
   * passed to previously executed statement function callbacks are passed
   * through to the given function.
   * @param {finallyFunction} fn Function to execute.
   */
  finally(fn) {
    if (!isFunction(fn)) throw new Error(`'finally' second arg is not a function (type: ${getFriendlyType(fn)}).`);
    
    this.logicTree.finallyFn = fn;
    return;
  }
}

/**
 * Interface to build logic tree after an "if" or "elseIf" statement.
 * "elseIf", "else" and "finally" are allowed after "if" and "elseIf".
 */
class AsyncLogicTreeBuilderIf extends AsyncLogicTreeBuilderElse {
  /**
   * Creates a new logic tree builder.
   * @param {AsyncLogicTree} logicTree 
   */
  constructor(logicTree) {
    super(logicTree);
  }
  
  /**
   * If the previous statement evaluated to false and the given test
   * evaluates to true, the given function is executed.
   * @param {test}         test Value or function to evaluate.
   * @param {execFunction} fn   Function to execute. First argument is the callback.
   */
  elseIf(test, fn) {
    if (!isFunction(fn)) throw new Error(`'elseIf' second arg is not a function (type: ${getFriendlyType(fn)}).`);
    
    this.logicTree.ifStatements.push(new AsyncIfStatement(test, fn));
    return new AsyncLogicTreeBuilderIf(this.logicTree);
  }
  
  /**
   * If the previous statement evaluated to false, the given function
   * is executed.
   * @param {execFunction} fn Function to execute. First argument is the callback.
   */
  else(fn) {
    if (!isFunction(fn)) throw new Error(`'else' second arg is not a function (type: ${getFriendlyType(fn)}).`);
    
    this.logicTree.elseFn = fn;
    return new AsyncLogicTreeBuilderElse(this.logicTree);
  }
}


/**
 * Determains if the given value is a function
 * @param {*} val 
 */
function isFunction(val) {
  return typeof val === 'function';
}

/**
 * Calls callback immediately (does nothing).
 * @param {function} cb Callback.
 */
function noopCB(cb) {cb();}


/**
 * Calls callback immediately (does nothing).
 * @param {function} cb Callback.
 */
function getFriendlyType(val) {
  if (val === null) {
    return 'null';
  }
  
  return typeof val;
}