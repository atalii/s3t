/******************************************************************************
 * File: core.js
 * Author: Keith Schwarz (htiek@cs.stanford.edu)
 *
 * Core functionality for the propositional logic tool.
 */

/* Function: go
 *
 * Runs the complete stack!
 */
function go() {
  var input = document.getElementById("expressionInput").value;

  try {
    prettyPrintTruthTable(parse(input));

    let permalink = document.getElementById("permalink");
    let loc = new URL(window.location.toLocaleString());
    loc.searchParams.set("q", encodeURIComponent(input));
    permalink.href = loc.toString();
    permalink.innerHTML = "permalink to this table";
  } catch (e) {
    if (e.description !== undefined) {
      displayCompileError(input, e);
    } else {
      throw e;
    }
  }
}

/* Function: assert
 *
 * Asserts that the given claim is true, throwing an exception if it isn't.
 */
function assert(expr, what) {
  if (expr === false) {
    throw new Error("Assertion failed: " + what);
  }
}

/* Function: unreachable
 *
 * Triggers a failure and reports an error
 */
function unreachable(why) {
  throw new Error("Unreachable code: " + why);
}

function startup() {
  const url = new URL(window.location.toLocaleString());
  let input = document.getElementById("expressionInput");
  const val = url.searchParams.get("q");
  if (!val) return;

  input.value = decodeURIComponent(val);
  go();
}
