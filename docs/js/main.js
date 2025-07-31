/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket trac-14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var flat = arr.flat ? function( array ) {
	return arr.flat.call( array );
} : function( array ) {
	return arr.concat.apply( [], array );
};


var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

		// Support: Chrome <=57, Firefox <=52
		// In some browsers, typeof returns "function" for HTML <object> elements
		// (i.e., `typeof document.createElement( "object" ) === "function"`).
		// We don't want to classify *any* DOM node as a function.
		// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
		// Plus for old WebKit, typeof returns "function" for HTML collections
		// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
		return typeof obj === "function" && typeof obj.nodeType !== "number" &&
			typeof obj.item !== "function";
	};


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};


var document = window.document;



	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var version = "3.7.1",

	rhtmlSuffix = /HTML$/i,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	even: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return ( i + 1 ) % 2;
		} ) );
	},

	odd: function() {
		return this.pushStack( jQuery.grep( this, function( _elem, i ) {
			return i % 2;
		} ) );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a provided context; falls back to the global one
	// if not specified.
	globalEval: function( code, options, doc ) {
		DOMEval( code, { nonce: options && options.nonce }, doc );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},


	// Retrieve the text value of an array of DOM nodes
	text: function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {

			// If no nodeType, this is expected to be an array
			while ( ( node = elem[ i++ ] ) ) {

				// Do not traverse comment nodes
				ret += jQuery.text( node );
			}
		}
		if ( nodeType === 1 || nodeType === 11 ) {
			return elem.textContent;
		}
		if ( nodeType === 9 ) {
			return elem.documentElement.textContent;
		}
		if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}

		// Do not include comment or processing instruction nodes

		return ret;
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
						[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	isXMLDoc: function( elem ) {
		var namespace = elem && elem.namespaceURI,
			docElem = elem && ( elem.ownerDocument || elem ).documentElement;

		// Assume HTML when documentElement doesn't yet exist, such as inside
		// document fragments.
		return !rhtmlSuffix.test( namespace || docElem && docElem.nodeName || "HTML" );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return flat( ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( _i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}


function nodeName( elem, name ) {

	return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

}
var pop = arr.pop;


var sort = arr.sort;


var splice = arr.splice;


var whitespace = "[\\x20\\t\\r\\n\\f]";


var rtrimCSS = new RegExp(
	"^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
	"g"
);




// Note: an element does not contain itself
jQuery.contains = function( a, b ) {
	var bup = b && b.parentNode;

	return a === bup || !!( bup && bup.nodeType === 1 && (

		// Support: IE 9 - 11+
		// IE doesn't have `contains` on SVG.
		a.contains ?
			a.contains( bup ) :
			a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
	) );
};




// CSS string/identifier serialization
// https://drafts.csswg.org/cssom/#common-serializing-idioms
var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

function fcssescape( ch, asCodePoint ) {
	if ( asCodePoint ) {

		// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
		if ( ch === "\0" ) {
			return "\uFFFD";
		}

		// Control characters and (dependent upon position) numbers get escaped as code points
		return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
	}

	// Other potentially-special ASCII characters get backslash-escaped
	return "\\" + ch;
}

jQuery.escapeSelector = function( sel ) {
	return ( sel + "" ).replace( rcssescape, fcssescape );
};




var preferredDoc = document,
	pushNative = push;

( function() {

var i,
	Expr,
	outermostContext,
	sortInput,
	hasDuplicate,
	push = pushNative,

	// Local document vars
	document,
	documentElement,
	documentIsHTML,
	rbuggyQSA,
	matches,

	// Instance-specific data
	expando = jQuery.expando,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|" +
		"loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
	identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

	// Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +

		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
		whitespace + "*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +

		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rleadingCombinator = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" +
		whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		ID: new RegExp( "^#(" + identifier + ")" ),
		CLASS: new RegExp( "^\\.(" + identifier + ")" ),
		TAG: new RegExp( "^(" + identifier + "|[*])" ),
		ATTR: new RegExp( "^" + attributes ),
		PSEUDO: new RegExp( "^" + pseudos ),
		CHILD: new RegExp(
			"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
				whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
				whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		bool: new RegExp( "^(?:" + booleans + ")$", "i" ),

		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		needsContext: new RegExp( "^" + whitespace +
			"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
			"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace +
		"?|\\\\([^\\r\\n\\f])", "g" ),
	funescape = function( escape, nonHex ) {
		var high = "0x" + escape.slice( 1 ) - 0x10000;

		if ( nonHex ) {

			// Strip the backslash prefix from a non-hex escape sequence
			return nonHex;
		}

		// Replace a hexadecimal escape sequence with the encoded Unicode code point
		// Support: IE <=11+
		// For values outside the Basic Multilingual Plane (BMP), manually construct a
		// surrogate pair
		return high < 0 ?
			String.fromCharCode( high + 0x10000 ) :
			String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes; see `setDocument`.
	// Support: IE 9 - 11+, Edge 12 - 18+
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE/Edge.
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && nodeName( elem, "fieldset" );
		},
		{ dir: "parentNode", next: "legend" }
	);

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		( arr = slice.call( preferredDoc.childNodes ) ),
		preferredDoc.childNodes
	);

	// Support: Android <=4.0
	// Detect silently failing push.apply
	// eslint-disable-next-line no-unused-expressions
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = {
		apply: function( target, els ) {
			pushNative.apply( target, slice.call( els ) );
		},
		call: function( target ) {
			pushNative.apply( target, slice.call( arguments, 1 ) );
		}
	};
}

function find( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {
		setDocument( context );
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

				// ID selector
				if ( ( m = match[ 1 ] ) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( ( elem = context.getElementById( m ) ) ) {

							// Support: IE 9 only
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								push.call( results, elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE 9 only
						// getElementById can match elements by name instead of ID
						if ( newContext && ( elem = newContext.getElementById( m ) ) &&
							find.contains( context, elem ) &&
							elem.id === m ) {

							push.call( results, elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[ 2 ] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( ( m = match[ 3 ] ) && context.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( !nonnativeSelectorCache[ selector + " " ] &&
				( !rbuggyQSA || !rbuggyQSA.test( selector ) ) ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// The technique has to be used as well when a leading combinator is used
				// as such selectors are not recognized by querySelectorAll.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 &&
					( rdescend.test( selector ) || rleadingCombinator.test( selector ) ) ) {

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;

					// We can use :scope instead of the ID hack if the browser
					// supports it & if we're not changing the context.
					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when
					// strict-comparing two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( newContext != context || !support.scope ) {

						// Capture the context ID, setting it first if necessary
						if ( ( nid = context.getAttribute( "id" ) ) ) {
							nid = jQuery.escapeSelector( nid );
						} else {
							context.setAttribute( "id", ( nid = expando ) );
						}
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
							toSelector( groups[ i ] );
					}
					newSelector = groups.join( "," );
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrimCSS, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {

		// Use (key + " ") to avoid collision with native prototype properties
		// (see https://github.com/jquery/sizzle/issues/157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {

			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return ( cache[ key + " " ] = value );
	}
	return cache;
}

/**
 * Mark a function for special use by jQuery selector module
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement( "fieldset" );

	try {
		return !!fn( el );
	} catch ( e ) {
		return false;
	} finally {

		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}

		// release memory in IE
		el = null;
	}
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		return nodeName( elem, "input" ) && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		return ( nodeName( elem, "input" ) || nodeName( elem, "button" ) ) &&
			elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11+
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction( function( argument ) {
		argument = +argument;
		return markFunction( function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
					seed[ j ] = !( matches[ j ] = seed[ j ] );
				}
			}
		} );
	} );
}

/**
 * Checks a node for validity as a jQuery selector context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [node] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
function setDocument( node ) {
	var subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	documentElement = document.documentElement;
	documentIsHTML = !jQuery.isXMLDoc( document );

	// Support: iOS 7 only, IE 9 - 11+
	// Older browsers didn't support unprefixed `matches`.
	matches = documentElement.matches ||
		documentElement.webkitMatchesSelector ||
		documentElement.msMatchesSelector;

	// Support: IE 9 - 11+, Edge 12 - 18+
	// Accessing iframe documents after unload throws "permission denied" errors
	// (see trac-13936).
	// Limit the fix to IE & Edge Legacy; despite Edge 15+ implementing `matches`,
	// all IE 9+ and Edge Legacy versions implement `msMatchesSelector` as well.
	if ( documentElement.msMatchesSelector &&

		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		preferredDoc != document &&
		( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

		// Support: IE 9 - 11+, Edge 12 - 18+
		subWindow.addEventListener( "unload", unloadHandler );
	}

	// Support: IE <10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert( function( el ) {
		documentElement.appendChild( el ).id = jQuery.expando;
		return !document.getElementsByName ||
			!document.getElementsByName( jQuery.expando ).length;
	} );

	// Support: IE 9 only
	// Check to see if it's possible to do matchesSelector
	// on a disconnected node.
	support.disconnectedMatch = assert( function( el ) {
		return matches.call( el, "*" );
	} );

	// Support: IE 9 - 11+, Edge 12 - 18+
	// IE/Edge don't support the :scope pseudo-class.
	support.scope = assert( function() {
		return document.querySelectorAll( ":scope" );
	} );

	// Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
	// Make sure the `:has()` argument is parsed unforgivingly.
	// We include `*` in the test to detect buggy implementations that are
	// _selectively_ forgiving (specifically when the list includes at least
	// one valid selector).
	// Note that we treat complete lack of support for `:has()` as if it were
	// spec-compliant support, which is fine because use of `:has()` in such
	// environments will fail in the qSA path and fall back to jQuery traversal
	// anyway.
	support.cssHas = assert( function() {
		try {
			document.querySelector( ":has(*,:jqfake)" );
			return false;
		} catch ( e ) {
			return true;
		}
	} );

	// ID filter and find
	if ( support.getById ) {
		Expr.filter.ID = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute( "id" ) === attrId;
			};
		};
		Expr.find.ID = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter.ID =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode( "id" );
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find.ID = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode( "id" );
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( ( elem = elems[ i++ ] ) ) {
						node = elem.getAttributeNode( "id" );
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find.TAG = function( tag, context ) {
		if ( typeof context.getElementsByTagName !== "undefined" ) {
			return context.getElementsByTagName( tag );

		// DocumentFragment nodes don't have gEBTN
		} else {
			return context.querySelectorAll( tag );
		}
	};

	// Class
	Expr.find.CLASS = function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	rbuggyQSA = [];

	// Build QSA regex
	// Regex strategy adopted from Diego Perini
	assert( function( el ) {

		var input;

		documentElement.appendChild( el ).innerHTML =
			"<a id='" + expando + "' href='' disabled='disabled'></a>" +
			"<select id='" + expando + "-\r\\' disabled='disabled'>" +
			"<option selected=''></option></select>";

		// Support: iOS <=7 - 8 only
		// Boolean attributes and "value" are not treated correctly in some XML documents
		if ( !el.querySelectorAll( "[selected]" ).length ) {
			rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
		}

		// Support: iOS <=7 - 8 only
		if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
			rbuggyQSA.push( "~=" );
		}

		// Support: iOS 8 only
		// https://bugs.webkit.org/show_bug.cgi?id=136851
		// In-page `selector#id sibling-combinator selector` fails
		if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
			rbuggyQSA.push( ".#.+[+~]" );
		}

		// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
		// In some of the document kinds, these selectors wouldn't work natively.
		// This is probably OK but for backwards compatibility we want to maintain
		// handling them through jQuery traversal in jQuery 3.x.
		if ( !el.querySelectorAll( ":checked" ).length ) {
			rbuggyQSA.push( ":checked" );
		}

		// Support: Windows 8 Native Apps
		// The type and name attributes are restricted during .innerHTML assignment
		input = document.createElement( "input" );
		input.setAttribute( "type", "hidden" );
		el.appendChild( input ).setAttribute( "name", "D" );

		// Support: IE 9 - 11+
		// IE's :disabled selector does not pick up the children of disabled fieldsets
		// Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
		// In some of the document kinds, these selectors wouldn't work natively.
		// This is probably OK but for backwards compatibility we want to maintain
		// handling them through jQuery traversal in jQuery 3.x.
		documentElement.appendChild( el ).disabled = true;
		if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
			rbuggyQSA.push( ":enabled", ":disabled" );
		}

		// Support: IE 11+, Edge 15 - 18+
		// IE 11/Edge don't find elements on a `[name='']` query in some cases.
		// Adding a temporary attribute to the document before the selection works
		// around the issue.
		// Interestingly, IE 10 & older don't seem to have the issue.
		input = document.createElement( "input" );
		input.setAttribute( "name", "" );
		el.appendChild( input );
		if ( !el.querySelectorAll( "[name='']" ).length ) {
			rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
				whitespace + "*(?:''|\"\")" );
		}
	} );

	if ( !support.cssHas ) {

		// Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
		// Our regular `try-catch` mechanism fails to detect natively-unsupported
		// pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
		// in browsers that parse the `:has()` argument as a forgiving selector list.
		// https://drafts.csswg.org/selectors/#relational now requires the argument
		// to be parsed unforgivingly, but browsers have not yet fully adjusted.
		rbuggyQSA.push( ":has" );
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		// Support: IE 11+, Edge 17 - 18+
		// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
		// two documents; shallow comparisons work.
		// eslint-disable-next-line eqeqeq
		compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

			// Choose the first element that is related to our preferred document
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( a === document || a.ownerDocument == preferredDoc &&
				find.contains( preferredDoc, a ) ) {
				return -1;
			}

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( b === document || b.ownerDocument == preferredDoc &&
				find.contains( preferredDoc, b ) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	};

	return document;
}

find.matches = function( expr, elements ) {
	return find( expr, null, null, elements );
};

find.matchesSelector = function( elem, expr ) {
	setDocument( elem );

	if ( documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyQSA || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||

					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch ( e ) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return find( expr, document, null, [ elem ] ).length > 0;
};

find.contains = function( context, elem ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( context.ownerDocument || context ) != document ) {
		setDocument( context );
	}
	return jQuery.contains( context, elem );
};


find.attr = function( elem, name ) {

	// Set document vars if needed
	// Support: IE 11+, Edge 17 - 18+
	// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
	// two documents; shallow comparisons work.
	// eslint-disable-next-line eqeqeq
	if ( ( elem.ownerDocument || elem ) != document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],

		// Don't get fooled by Object.prototype properties (see trac-13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	if ( val !== undefined ) {
		return val;
	}

	return elem.getAttribute( name );
};

find.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
jQuery.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	//
	// Support: Android <=4.0+
	// Testing for detecting duplicates is unpredictable so instead assume we can't
	// depend on duplicate detection in all browsers without a stable sort.
	hasDuplicate = !support.sortStable;
	sortInput = !support.sortStable && slice.call( results, 0 );
	sort.call( results, sortOrder );

	if ( hasDuplicate ) {
		while ( ( elem = results[ i++ ] ) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			splice.call( results, duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

jQuery.fn.uniqueSort = function() {
	return this.pushStack( jQuery.uniqueSort( slice.apply( this ) ) );
};

Expr = jQuery.expr = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		ATTR: function( match ) {
			match[ 1 ] = match[ 1 ].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[ 3 ] = ( match[ 3 ] || match[ 4 ] || match[ 5 ] || "" )
				.replace( runescape, funescape );

			if ( match[ 2 ] === "~=" ) {
				match[ 3 ] = " " + match[ 3 ] + " ";
			}

			return match.slice( 0, 4 );
		},

		CHILD: function( match ) {

			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[ 1 ] = match[ 1 ].toLowerCase();

			if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

				// nth-* requires argument
				if ( !match[ 3 ] ) {
					find.error( match[ 0 ] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[ 4 ] = +( match[ 4 ] ?
					match[ 5 ] + ( match[ 6 ] || 1 ) :
					2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" )
				);
				match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

			// other types prohibit arguments
			} else if ( match[ 3 ] ) {
				find.error( match[ 0 ] );
			}

			return match;
		},

		PSEUDO: function( match ) {
			var excess,
				unquoted = !match[ 6 ] && match[ 2 ];

			if ( matchExpr.CHILD.test( match[ 0 ] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[ 3 ] ) {
				match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&

				// Get excess from tokenize (recursively)
				( excess = tokenize( unquoted, true ) ) &&

				// advance to the next closing parenthesis
				( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

				// excess is a negative index
				match[ 0 ] = match[ 0 ].slice( 0, excess );
				match[ 2 ] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		TAG: function( nodeNameSelector ) {
			var expectedNodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() {
					return true;
				} :
				function( elem ) {
					return nodeName( elem, expectedNodeName );
				};
		},

		CLASS: function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				( pattern = new RegExp( "(^|" + whitespace + ")" + className +
					"(" + whitespace + "|$)" ) ) &&
				classCache( className, function( elem ) {
					return pattern.test(
						typeof elem.className === "string" && elem.className ||
							typeof elem.getAttribute !== "undefined" &&
								elem.getAttribute( "class" ) ||
							""
					);
				} );
		},

		ATTR: function( name, operator, check ) {
			return function( elem ) {
				var result = find.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				if ( operator === "=" ) {
					return result === check;
				}
				if ( operator === "!=" ) {
					return result !== check;
				}
				if ( operator === "^=" ) {
					return check && result.indexOf( check ) === 0;
				}
				if ( operator === "*=" ) {
					return check && result.indexOf( check ) > -1;
				}
				if ( operator === "$=" ) {
					return check && result.slice( -check.length ) === check;
				}
				if ( operator === "~=" ) {
					return ( " " + result.replace( rwhitespace, " " ) + " " )
						.indexOf( check ) > -1;
				}
				if ( operator === "|=" ) {
					return result === check || result.slice( 0, check.length + 1 ) === check + "-";
				}

				return false;
			};
		},

		CHILD: function( type, what, _argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, _context, xml ) {
					var cache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( ( node = node[ dir ] ) ) {
									if ( ofType ?
										nodeName( node, name ) :
										node.nodeType === 1 ) {

										return false;
									}
								}

								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || ( parent[ expando ] = {} );
							cache = outerCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( ( node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								( diff = nodeIndex = 0 ) || start.pop() ) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {

							// Use previously-cached element index if available
							if ( useCache ) {
								outerCache = elem[ expando ] || ( elem[ expando ] = {} );
								cache = outerCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {

								// Use the same loop as above to seek `elem` from the start
								while ( ( node = ++nodeIndex && node && node[ dir ] ||
									( diff = nodeIndex = 0 ) || start.pop() ) ) {

									if ( ( ofType ?
										nodeName( node, name ) :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] ||
												( node[ expando ] = {} );
											outerCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		PSEUDO: function( pseudo, argument ) {

			// pseudo-class names are case-insensitive
			// https://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					find.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as jQuery does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction( function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[ i ] );
							seed[ idx ] = !( matches[ idx ] = matched[ i ] );
						}
					} ) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {

		// Potentially complex pseudos
		not: markFunction( function( selector ) {

			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrimCSS, "$1" ) );

			return matcher[ expando ] ?
				markFunction( function( seed, matches, _context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( ( elem = unmatched[ i ] ) ) {
							seed[ i ] = !( matches[ i ] = elem );
						}
					}
				} ) :
				function( elem, _context, xml ) {
					input[ 0 ] = elem;
					matcher( input, null, xml, results );

					// Don't keep the element
					// (see https://github.com/jquery/sizzle/issues/299)
					input[ 0 ] = null;
					return !results.pop();
				};
		} ),

		has: markFunction( function( selector ) {
			return function( elem ) {
				return find( selector, elem ).length > 0;
			};
		} ),

		contains: markFunction( function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || jQuery.text( elem ) ).indexOf( text ) > -1;
			};
		} ),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// https://www.w3.org/TR/selectors/#lang-pseudo
		lang: markFunction( function( lang ) {

			// lang value must be a valid identifier
			if ( !ridentifier.test( lang || "" ) ) {
				find.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( ( elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
				return false;
			};
		} ),

		// Miscellaneous
		target: function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		root: function( elem ) {
			return elem === documentElement;
		},

		focus: function( elem ) {
			return elem === safeActiveElement() &&
				document.hasFocus() &&
				!!( elem.type || elem.href || ~elem.tabIndex );
		},

		// Boolean properties
		enabled: createDisabledPseudo( false ),
		disabled: createDisabledPseudo( true ),

		checked: function( elem ) {

			// In CSS3, :checked should return both checked and selected elements
			// https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			return ( nodeName( elem, "input" ) && !!elem.checked ) ||
				( nodeName( elem, "option" ) && !!elem.selected );
		},

		selected: function( elem ) {

			// Support: IE <=11+
			// Accessing the selectedIndex property
			// forces the browser to treat the default option as
			// selected when in an optgroup.
			if ( elem.parentNode ) {
				// eslint-disable-next-line no-unused-expressions
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		empty: function( elem ) {

			// https://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		parent: function( elem ) {
			return !Expr.pseudos.empty( elem );
		},

		// Element/input types
		header: function( elem ) {
			return rheader.test( elem.nodeName );
		},

		input: function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		button: function( elem ) {
			return nodeName( elem, "input" ) && elem.type === "button" ||
				nodeName( elem, "button" );
		},

		text: function( elem ) {
			var attr;
			return nodeName( elem, "input" ) && elem.type === "text" &&

				// Support: IE <10 only
				// New HTML5 attribute values (e.g., "search") appear
				// with elem.type === "text"
				( ( attr = elem.getAttribute( "type" ) ) == null ||
					attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		first: createPositionalPseudo( function() {
			return [ 0 ];
		} ),

		last: createPositionalPseudo( function( _matchIndexes, length ) {
			return [ length - 1 ];
		} ),

		eq: createPositionalPseudo( function( _matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		} ),

		even: createPositionalPseudo( function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		odd: createPositionalPseudo( function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		lt: createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i;

			if ( argument < 0 ) {
				i = argument + length;
			} else if ( argument > length ) {
				i = length;
			} else {
				i = argument;
			}

			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} ),

		gt: createPositionalPseudo( function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		} )
	}
};

Expr.pseudos.nth = Expr.pseudos.eq;

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
			if ( match ) {

				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[ 0 ].length ) || soFar;
			}
			groups.push( ( tokens = [] ) );
		}

		matched = false;

		// Combinators
		if ( ( match = rleadingCombinator.exec( soFar ) ) ) {
			matched = match.shift();
			tokens.push( {
				value: matched,

				// Cast descendant combinators to space
				type: match[ 0 ].replace( rtrimCSS, " " )
			} );
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
				( match = preFilters[ type ]( match ) ) ) ) {
				matched = match.shift();
				tokens.push( {
					value: matched,
					type: type,
					matches: match
				} );
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	if ( parseOnly ) {
		return soFar.length;
	}

	return soFar ?
		find.error( selector ) :

		// Cache the tokens
		tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[ i ].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?

		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( ( elem = elem[ dir ] ) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( ( elem = elem[ dir ] ) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || ( elem[ expando ] = {} );

						if ( skip && nodeName( elem, skip ) ) {
							elem = elem[ dir ] || elem;
						} else if ( ( oldCache = outerCache[ key ] ) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return ( newCache[ 2 ] = oldCache[ 2 ] );
						} else {

							// Reuse newcache so results back-propagate to previous elements
							outerCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[ i ]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[ 0 ];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		find( selector, contexts[ i ], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( ( elem = unmatched[ i ] ) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction( function( seed, results, context, xml ) {
		var temp, i, elem, matcherOut,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed ||
				multipleContexts( selector || "*",
					context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems;

		if ( matcher ) {

			// If we have a postFinder, or filtered seed, or non-seed postFilter
			// or preexisting results,
			matcherOut = postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

				// ...intermediate processing is necessary
				[] :

				// ...otherwise use results directly
				results;

			// Find primary matches
			matcher( matcherIn, matcherOut, context, xml );
		} else {
			matcherOut = matcherIn;
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( ( elem = temp[ i ] ) ) {
					matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {

					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( ( elem = matcherOut[ i ] ) ) {

							// Restore matcherIn since elem is not yet a final match
							temp.push( ( matcherIn[ i ] = elem ) );
						}
					}
					postFinder( null, ( matcherOut = [] ), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( ( elem = matcherOut[ i ] ) &&
						( temp = postFinder ? indexOf.call( seed, elem ) : preMap[ i ] ) > -1 ) {

						seed[ temp ] = !( results[ temp ] = elem );
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	} );
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[ 0 ].type ],
		implicitRelative = leadingRelative || Expr.relative[ " " ],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {

			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			var ret = ( !leadingRelative && ( xml || context != outermostContext ) ) || (
				( checkContext = context ).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );

			// Avoid hanging onto element
			// (see https://github.com/jquery/sizzle/issues/299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
			matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
		} else {
			matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {

				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[ j ].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(

						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 )
							.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
					).replace( rtrimCSS, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,

				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find.TAG( "*", outermost ),

				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
				len = elems.length;

			if ( outermost ) {

				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				outermostContext = context == document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: iOS <=7 - 9 only
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
			// elements by id. (see trac-14142)
			for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( !context && elem.ownerDocument != document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( ( matcher = elementMatchers[ j++ ] ) ) {
						if ( matcher( elem, context || document, xml ) ) {
							push.call( results, elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {

					// They will have gone through all possible matchers
					if ( ( elem = !matcher && elem ) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( ( matcher = setMatchers[ j++ ] ) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {

					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
								setMatched[ i ] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					jQuery.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

function compile( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {

		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[ i ] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector,
			matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
}

/**
 * A low-level selection function that works with jQuery's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with jQuery selector compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( ( selector = compiled.selector || selector ) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[ 0 ] = match[ 0 ].slice( 0 );
		if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

			context = ( Expr.find.ID(
				token.matches[ 0 ].replace( runescape, funescape ),
				context
			) || [] )[ 0 ];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr.needsContext.test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[ i ];

			// Abort if we hit a combinator
			if ( Expr.relative[ ( type = token.type ) ] ) {
				break;
			}
			if ( ( find = Expr.find[ type ] ) ) {

				// Search, expanding context for leading sibling combinators
				if ( ( seed = find(
					token.matches[ 0 ].replace( runescape, funescape ),
					rsibling.test( tokens[ 0 ].type ) &&
						testContext( context.parentNode ) || context
				) ) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Support: Android <=4.0 - 4.1+
// Sort stability
support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

// Initialize against the default document
setDocument();

// Support: Android <=4.0 - 4.1+
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert( function( el ) {

	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
} );

jQuery.find = find;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.unique = jQuery.uniqueSort;

// These have always been private, but they used to be documented as part of
// Sizzle so let's maintain them for now for backwards compatibility purposes.
find.compile = compile;
find.select = select;
find.setDocument = setDocument;
find.tokenize = tokenize;

find.escape = jQuery.escapeSelector;
find.getText = jQuery.text;
find.isXML = jQuery.isXMLDoc;
find.selectors = jQuery.expr;
find.support = jQuery.support;
find.uniqueSort = jQuery.uniqueSort;

	/* eslint-enable */

} )();


var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
	// Strict HTML recognition (trac-11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to jQuery#find
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, _i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, _i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, _i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( elem.contentDocument != null &&

			// Support: IE 11+
			// <object> elements with no `data` attribute has an object
			// `contentDocument` with a `null` prototype.
			getProto( elem.contentDocument ) ) {

			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( _i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.error );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the error, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getErrorHook ) {
									process.error = jQuery.Deferred.getErrorHook();

								// The deprecated alias of the above. While the name suggests
								// returning the stack, not an error instance, jQuery just passes
								// it directly to `console.warn` so both will work; an instance
								// just better cooperates with source maps.
								} else if ( jQuery.Deferred.getStackHook ) {
									process.error = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the primary Deferred
			primary = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						primary.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( primary.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return primary.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
		}

		return primary.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

// If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
// captured before the async barrier to get the original error cause
// which may otherwise be hidden.
jQuery.Deferred.exceptionHook = function( error, asyncError ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message,
			error.stack, asyncError );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See trac-6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, _key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( _all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (trac-9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see trac-8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (trac-14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (trac-11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (trac-14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// Support: IE <=9 only
	// IE <=9 replaces <option> tags with their contents when inserted outside of
	// the select element.
	div.innerHTML = "<option></option>";
	support.option = !!div.lastChild;
} )();


// We have to close these tags to support XHTML (trac-13200)
var wrapMap = {

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: IE <=9 only
if ( !support.option ) {
	wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
}


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (trac-12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Only attach events to objects that accept data
		if ( !acceptData( elem ) ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = Object.create( null );
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( nativeEvent ),

			handlers = (
				dataPriv.get( this, "events" ) || Object.create( null )
			)[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (trac-13208)
				// Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (trac-13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
						return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
						return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", true );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, isSetup ) {

	// Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
	if ( !isSetup ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				if ( !saved ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					this[ type ]();
					result = dataPriv.get( this, type );
					dataPriv.set( this, type, false );

					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();

						return result;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering
				// the native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved ) {

				// ...and capture the result
				dataPriv.set( this, type, jQuery.event.trigger(
					saved[ 0 ],
					saved.slice( 1 ),
					this
				) );

				// Abort handling of the native event by all jQuery handlers while allowing
				// native handlers on the same element to run. On target, this is achieved
				// by stopping immediate propagation just on the jQuery event. However,
				// the native event is re-wrapped by a jQuery one on each level of the
				// propagation so the only way to stop it for jQuery is to stop it for
				// everyone via native `stopPropagation()`. This is not a problem for
				// focus/blur which don't bubble, but it does also stop click on checkboxes
				// and radios. We accept this limitation.
				event.stopPropagation();
				event.isImmediatePropagationStopped = returnTrue;
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (trac-504, trac-13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,
	which: true
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {

	function focusMappedHandler( nativeEvent ) {
		if ( document.documentMode ) {

			// Support: IE 11+
			// Attach a single focusin/focusout handler on the document while someone wants
			// focus/blur. This is because the former are synchronous in IE while the latter
			// are async. In other browsers, all those handlers are invoked synchronously.

			// `handle` from private data would already wrap the event, but we need
			// to change the `type` here.
			var handle = dataPriv.get( this, "handle" ),
				event = jQuery.event.fix( nativeEvent );
			event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
			event.isSimulated = true;

			// First, handle focusin/focusout
			handle( nativeEvent );

			// ...then, handle focus/blur
			//
			// focus/blur don't bubble while focusin/focusout do; simulate the former by only
			// invoking the handler at the lower level.
			if ( event.target === event.currentTarget ) {

				// The setup part calls `leverageNative`, which, in turn, calls
				// `jQuery.event.add`, so event handle will already have been set
				// by this point.
				handle( event );
			}
		} else {

			// For non-IE browsers, attach a single capturing handler on the document
			// while someone wants focusin/focusout.
			jQuery.event.simulate( delegateType, nativeEvent.target,
				jQuery.event.fix( nativeEvent ) );
		}
	}

	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			var attaches;

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, true );

			if ( document.documentMode ) {

				// Support: IE 9 - 11+
				// We use the same native handler for focusin & focus (and focusout & blur)
				// so we need to coordinate setup & teardown parts between those events.
				// Use `delegateType` as the key as `type` is already used by `leverageNative`.
				attaches = dataPriv.get( this, delegateType );
				if ( !attaches ) {
					this.addEventListener( delegateType, focusMappedHandler );
				}
				dataPriv.set( this, delegateType, ( attaches || 0 ) + 1 );
			} else {

				// Return false to allow normal processing in the caller
				return false;
			}
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		teardown: function() {
			var attaches;

			if ( document.documentMode ) {
				attaches = dataPriv.get( this, delegateType ) - 1;
				if ( !attaches ) {
					this.removeEventListener( delegateType, focusMappedHandler );
					dataPriv.remove( this, delegateType );
				} else {
					dataPriv.set( this, delegateType, attaches );
				}
			} else {

				// Return false to indicate standard teardown should be applied
				return false;
			}
		},

		// Suppress native focus or blur if we're currently inside
		// a leveraged native-event stack
		_default: function( event ) {
			return dataPriv.get( event.target, type );
		},

		delegateType: delegateType
	};

	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	//
	// Support: IE 9 - 11+
	// To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
	// attach a single handler for both events in IE.
	jQuery.event.special[ delegateType ] = {
		setup: function() {

			// Handle: regular nodes (via `this.ownerDocument`), window
			// (via `this.document`) & document (via `this`).
			var doc = this.ownerDocument || this.document || this,
				dataHolder = document.documentMode ? this : doc,
				attaches = dataPriv.get( dataHolder, delegateType );

			// Support: IE 9 - 11+
			// We use the same native handler for focusin & focus (and focusout & blur)
			// so we need to coordinate setup & teardown parts between those events.
			// Use `delegateType` as the key as `type` is already used by `leverageNative`.
			if ( !attaches ) {
				if ( document.documentMode ) {
					this.addEventListener( delegateType, focusMappedHandler );
				} else {
					doc.addEventListener( type, focusMappedHandler, true );
				}
			}
			dataPriv.set( dataHolder, delegateType, ( attaches || 0 ) + 1 );
		},
		teardown: function() {
			var doc = this.ownerDocument || this.document || this,
				dataHolder = document.documentMode ? this : doc,
				attaches = dataPriv.get( dataHolder, delegateType ) - 1;

			if ( !attaches ) {
				if ( document.documentMode ) {
					this.removeEventListener( delegateType, focusMappedHandler );
				} else {
					doc.removeEventListener( type, focusMappedHandler, true );
				}
				dataPriv.remove( dataHolder, delegateType );
			} else {
				dataPriv.set( dataHolder, delegateType, attaches );
			}
		}
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,

	rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.get( src );
		events = pdataOld.events;

		if ( events ) {
			dataPriv.remove( dest, "handle events" );

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = flat( args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (trac-8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Re-enable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								}, doc );
							}
						} else {

							// Unwrap a CDATA section containing script contents. This shouldn't be
							// needed as in XML documents they're already not visible when
							// inspecting element contents and in HTML documents they have no
							// meaning but we're preserving that logic for backwards compatibility.
							// This will be removed completely in 4.0. See gh-4904.
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html;
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew jQuery#find here for performance reasons:
			// https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var rcustomProp = /^--/;


var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var swap = function( elem, options, callback ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.call( elem );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableTrDimensionsVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (trac-8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		},

		// Support: IE 9 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Behavior in IE 9 is more subtle than in newer versions & it passes
		// some versions of this test; make sure not to make it pass there!
		//
		// Support: Firefox 70+
		// Only Firefox includes border widths
		// in computed dimensions. (gh-4529)
		reliableTrDimensions: function() {
			var table, tr, trChild, trStyle;
			if ( reliableTrDimensionsVal == null ) {
				table = document.createElement( "table" );
				tr = document.createElement( "tr" );
				trChild = document.createElement( "div" );

				table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
				tr.style.cssText = "box-sizing:content-box;border:1px solid";

				// Support: Chrome 86+
				// Height set through cssText does not get applied.
				// Computed height then comes back as 0.
				tr.style.height = "1px";
				trChild.style.height = "9px";

				// Support: Android 8 Chrome 86+
				// In our bodyBackground.html iframe,
				// display for all div elements is set to "inline",
				// which causes a problem only in Android 8 Chrome 86.
				// Ensuring the div is `display: block`
				// gets around this issue.
				trChild.style.display = "block";

				documentElement
					.appendChild( table )
					.appendChild( tr )
					.appendChild( trChild );

				trStyle = window.getComputedStyle( tr );
				reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
					parseInt( trStyle.borderTopWidth, 10 ) +
					parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

				documentElement.removeChild( table );
			}
			return reliableTrDimensionsVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		isCustomProp = rcustomProp.test( name ),

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, trac-12537)
	//   .css('--customProperty) (gh-3144)
	if ( computed ) {

		// Support: IE <=9 - 11+
		// IE only supports `"float"` in `getPropertyValue`; in computed styles
		// it's only available as `"cssFloat"`. We no longer modify properties
		// sent to `.css()` apart from camelCasing, so we need to check both.
		// Normally, this would create difference in behavior: if
		// `getPropertyValue` returns an empty string, the value returned
		// by `.css()` would be `undefined`. This is usually the case for
		// disconnected elements. However, in IE even disconnected elements
		// with no styles return `"none"` for `getPropertyValue( "float" )`
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( isCustomProp && ret ) {

			// Support: Firefox 105+, Chrome <=105+
			// Spec requires trimming whitespace for custom properties (gh-4926).
			// Firefox only trims leading whitespace. Chrome just collapses
			// both leading & trailing whitespace to a single space.
			//
			// Fall back to `undefined` if empty string returned.
			// This collapses a missing definition with property defined
			// and set to an empty string but there's no standard API
			// allowing us to differentiate them without a performance penalty
			// and returning `undefined` aligns with older jQuery.
			//
			// rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
			// as whitespace while CSS does not, but this is not a problem
			// because CSS preprocessing replaces them with U+000A LINE FEED
			// (which *is* CSS whitespace)
			// https://www.w3.org/TR/css-syntax-3/#input-preprocessing
			ret = ret.replace( rtrimCSS, "$1" ) || undefined;
		}

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( _elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0,
		marginDelta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		// Count margin delta separately to only add it after scroll gutter adjustment.
		// This is needed to make negative margins work with `outerHeight( true )` (gh-3982).
		if ( box === "margin" ) {
			marginDelta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta + marginDelta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Support: IE 9 - 11 only
	// Use offsetWidth/offsetHeight for when box sizing is unreliable.
	// In those cases, the computed value can be trusted to be border-box.
	if ( ( !support.boxSizingReliable() && isBorderBox ||

		// Support: IE 10 - 11+, Edge 15 - 18+
		// IE/Edge misreport `getComputedStyle` of table rows with width/height
		// set in CSS while `offset*` properties report correct values.
		// Interestingly, in some cases IE 9 doesn't suffer from this issue.
		!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

		// Fall back to offsetWidth/offsetHeight when value is "auto"
		// This happens for inline elements with no explicit setting (gh-3571)
		val === "auto" ||

		// Support: Android <=4.1 - 4.3 only
		// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

		// Make sure the element is visible & connected
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		animationIterationCount: true,
		aspectRatio: true,
		borderImageSlice: true,
		columnCount: true,
		flexGrow: true,
		flexShrink: true,
		fontWeight: true,
		gridArea: true,
		gridColumn: true,
		gridColumnEnd: true,
		gridColumnStart: true,
		gridRow: true,
		gridRowEnd: true,
		gridRowStart: true,
		lineHeight: true,
		opacity: true,
		order: true,
		orphans: true,
		scale: true,
		widows: true,
		zIndex: true,
		zoom: true,

		// SVG-related
		fillOpacity: true,
		floodOpacity: true,
		stopOpacity: true,
		strokeMiterlimit: true,
		strokeOpacity: true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (trac-7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug trac-9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (trac-7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( _i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
					swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, dimension, extra );
					} ) :
					getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
				jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

				/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
					animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};

		doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// Use proper attribute retrieval (trac-12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];
						if ( cur.indexOf( " " + className + " " ) < 0 ) {
							cur += className + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	removeClass: function( value ) {
		var classNames, cur, curValue, className, i, finalValue;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classNames = classesToArray( value );

		if ( classNames.length ) {
			return this.each( function() {
				curValue = getClass( this );

				// This expression is here for better compressibility (see addClass)
				cur = this.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					for ( i = 0; i < classNames.length; i++ ) {
						className = classNames[ i ];

						// Remove *all* instances
						while ( cur.indexOf( " " + className + " " ) > -1 ) {
							cur = cur.replace( " " + className + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						this.setAttribute( "class", finalValue );
					}
				}
			} );
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var classNames, className, i, self,
			type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		classNames = classesToArray( value );

		return this.each( function() {
			if ( isValidValue ) {

				// Toggle individual class names
				self = jQuery( this );

				for ( i = 0; i < classNames.length; i++ ) {
					className = classNames[ i ];

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
				return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (trac-14686, trac-14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (trac-2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion
var location = window.location;

var nonce = { guid: Date.now() };

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, parserErrorElem;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {}

	parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
	if ( !xml || parserErrorElem ) {
		jQuery.error( "Invalid XML: " + (
			parserErrorElem ?
				jQuery.map( parserErrorElem.childNodes, function( el ) {
					return el.textContent;
				} ).join( "\n" ) :
				data
		) );
	}
	return xml;
};


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (trac-9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (trac-6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} ).filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} ).map( function( _i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// trac-7653, trac-8125, trac-8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );

originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes trac-9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (trac-10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket trac-12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// trac-9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
					uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Use a noop converter for missing script but not if jsonp
			if ( !isSuccess &&
				jQuery.inArray( "script", s.dataTypes ) > -1 &&
				jQuery.inArray( "json", s.dataTypes ) < 0 ) {
				s.converters[ "text script" ] = function() {};
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( _i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );

jQuery.ajaxPrefilter( function( s ) {
	var i;
	for ( i in s.headers ) {
		if ( i.toLowerCase() === "content-type" ) {
			s.contentType = s.headers[ i ] || "";
		}
	}
} );


jQuery._evalUrl = function( url, options, doc ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (trac-11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options, doc );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// trac-1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see trac-8605, trac-14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// trac-14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( _i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( {
		padding: "inner" + name,
		content: type,
		"": "outer" + name
	}, function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( _i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	},

	hover: function( fnOver, fnOut ) {
		return this
			.on( "mouseenter", fnOver )
			.on( "mouseleave", fnOut || fnOver );
	}
} );

jQuery.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	}
);




// Support: Android <=4.0 only
// Make sure we trim BOM and NBSP
// Require that the "whitespace run" starts from a non-whitespace
// to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};

jQuery.trim = function( text ) {
	return text == null ?
		"" :
		( text + "" ).replace( rtrim, "$1" );
};



// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (trac-13566)
if ( typeof noGlobal === "undefined" ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

!/*! License details at fancyapps.com/license */function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).window=e.window||{})}(this,function(e){"use strict";let t,n,o,i,l=e=>"object"==typeof e&&null!==e&&e.constructor===Object&&"[object Object]"===Object.prototype.toString.call(e),a=e=>"string"==typeof e,r=e=>e&&null!==e&&e instanceof Element&&"nodeType"in e,s=function(e){var t=new DOMParser().parseFromString(e,"text/html").body;if(t.childElementCount>1){for(var n=document.createElement("div");t.firstChild;)n.appendChild(t.firstChild);return n}let o=t.firstChild;if(o&&!(o instanceof HTMLElement)){var n=document.createElement("div");return n.appendChild(o),n}return o},c=function(e){if(!(e&&e instanceof Element&&e.offsetParent))return!1;let t=e.scrollHeight>e.clientHeight,n=window.getComputedStyle(e).overflowY,o=-1!==n.indexOf("hidden"),i=-1!==n.indexOf("visible");return t&&!o&&!i},u=function(e,t){return!e||e===document.body||t&&e===t?null:c(e)?e:u(e.parentElement,t)},d=(e=!0,t="--f-scrollbar-compensate",n="--f-body-margin",o="hide-scrollbar")=>{let i=document,l=i.body,a=i.documentElement;if(e){if(l.classList.contains(o))return;let e=window.innerWidth-a.getBoundingClientRect().width;e<0&&(e=0),a.style.setProperty(t,`${e}px`);let i=parseFloat(window.getComputedStyle(l).marginRight);i&&l.style.setProperty(n,`${i}px`),l.classList.add(o)}else l.classList.remove(o),l.style.setProperty(n,""),i.documentElement.style.setProperty(t,"")},f=(e,...t)=>{let n=t.length;for(let o=0;o<n;o++)Object.entries(t[o]||{}).forEach(([t,n])=>{let o=Array.isArray(n)?[]:{};e[t]||Object.assign(e,{[t]:o}),l(n)?Object.assign(e[t],f(o,n)):Array.isArray(n)?Object.assign(e,{[t]:[...n]}):Object.assign(e,{[t]:n})});return e};function g(){return!!("undefined"!=typeof window&&window.document&&window.document.createElement)}let p=function(e=0,t=0,n=0){return Math.max(Math.min(t,n),e)},m=function(e=0,t=0,n=0,o=0,i=0,l=!1){let a=(e-t)/(n-t)*(i-o)+o;return l?o<i?p(o,a,i):p(i,a,o):a},h=(e,t="")=>{e&&e.classList&&t.split(" ").forEach(t=>{t&&e.classList.add(t)})};function v(e){return l(e)||Array.isArray(e)}function y(e,t){let n=Object.keys(e),o=Object.keys(t);return n.length===o.length&&n.every(n=>{let o=e[n],i=t[n];return"function"==typeof o?`${o}`==`${i}`:v(o)&&v(i)?y(o,i):o===i})}let b=1/60*3e3,E=function(e){for(let t of I)t.getState()===w.Running&&t.tick(F?e-F:0);F=e,$=window.requestAnimationFrame(E)},w=((x={})[x.Initializing=0]="Initializing",x[x.Running=1]="Running",x[x.Paused=2]="Paused",x[x.Completed=3]="Completed",x[x.Destroyed=4]="Destroyed",x);var x,M,L,S,T,R,P,C,O,A,z=((M=z||{})[M.Spring=0]="Spring",M[M.Ease=1]="Ease",M);let k=((L={})[L.Loop=0]="Loop",L[L.Reverse=1]="Reverse",L),I=new Set,$=null,F=0;function _(){let e=w.Initializing,t=z.Ease,n=0,o=0,i=_.Easings.Linear,l=500,a=0,r=0,s=0,c=0,u=1/0,d=.01,f=.01,g=!1,m={},h=null,v={},x={},M={},L=0,S=0,T=k.Loop,R=_.Easings.Linear,P=new Map;function C(e,...t){for(let n of P.get(e)||[])n(...t)}function O(e){return o=0,e?h=setTimeout(()=>{A()},e):A(),D}function A(){e=w.Running,C("start",v,x)}function F(){if(e=w.Completed,M={},C("end",v),e===w.Completed)if(n<L){if(n++,T===k.Reverse){let e={...m};m={...x},x=e}O(S)}else n=0;return D}let D={getState:function(){return e},easing:function(e){return i=e,t=z.Ease,M={},D},duration:function(e){return l=e,D},spring:function(e={}){t=z.Spring;let{velocity:n,mass:o,tension:i,friction:l,restDelta:p,restSpeed:m,maxSpeed:h,clamp:v}={velocity:0,mass:1,tension:170,friction:26,restDelta:.1,restSpeed:.1,maxSpeed:1/0,clamp:!0,...e};return a=n,r=o,s=i,c=l,f=p,d=m,u=h,g=v,M={},D},isRunning:function(){return e===w.Running},isSpring:function(){return t===z.Spring},from:function(e){return v={...e},D},to:function(e){return x=e,D},repeat:function(e,t=0,n=k.Loop,o){return L=e,S=t,T=n,R=o||i,D},on:function(e,t){return P.set(e,[...P.get(e)||[],t]),D},off:function(e,t){return P.has(e)&&P.set(e,P.get(e).filter(e=>e!==t)),D},start:function(t){return e=w.Initializing,y(m={...v},x)||(I.add(this),$||($=window.requestAnimationFrame(E)),O(t)),D},pause:function(){return h&&(clearTimeout(h),h=null),e===w.Running&&(e=w.Paused,C("pause",v)),D},end:F,tick:function(n){n>b&&(n=b),o+=n;let h=0,E=!1;if(e!==w.Running)return D;if(t===z.Ease){E=1===(h=p(0,o/l,1));let e=T===k.Reverse?R:i;for(let t in v)v[t]=m[t]+(x[t]-m[t])*e(h)}if(t===z.Spring){let e=.001*n,t=0;for(let n in v){let o=x[n],i=v[n];if(!("number"==typeof o&&!isNaN(o))||!("number"==typeof i&&!isNaN(i)))continue;if(Math.abs(o-i)<=f){v[n]=o,M[n]=0;continue}M[n]||("object"==typeof a&&"number"==typeof a[n]?M[n]=a[n]:"number"==typeof a?M[n]=a:M[n]=0);let l=M[n],m=(l=p(-1*Math.abs(u),l,Math.abs(u)))*r*c,h=Math.abs(o-i)*s;l+=((i>o?-1:1)*h-m)/r*e,i+=l*e;let y=v[n]>o?i<o:i>o,b=Math.abs(l)<d&&Math.abs(o-i)<=f;g&&y&&(b=!0),b?(i=o,l=0):t++,v[n]=i,M[n]=l}E=!t}let L={...x};return C("step",v,m,x,h),E&&e===w.Running&&y(x,L)&&(e=w.Completed,F()),D},getStartValues:function(){return m},getCurrentValues:function(){return v},getCurrentVelocities:function(){return M},getEndValues:function(){return x},destroy:function(){e=w.Destroyed,h&&(clearTimeout(h),h=null),m=v=x={},I.delete(this)}};return D}function D(e){let t=[];for(let n of"undefined"!=typeof TouchEvent&&e instanceof TouchEvent?e.touches:e instanceof MouseEvent&&"mouseup"!==e.type?[e]:[])t.push({x:n.clientX,y:n.clientY,ts:Date.now()});return t}function H(e){let t=[];for(let n of"undefined"!=typeof TouchEvent&&e instanceof TouchEvent?e.changedTouches:e instanceof MouseEvent?[e]:[])t.push({x:n.clientX,y:n.clientY,ts:Date.now()});return t}function V(e){let t=e[0],n=e[1]||t;return{x:(t.x+n.x)/2,y:(t.y+n.y)/2,ts:n.ts}}function j(e){let t=e[0],n=e[1]||e[0];return t&&n?-1*Math.sqrt((n.x-t.x)*(n.x-t.x)+(n.y-t.y)*(n.y-t.y)):0}_.destroy=()=>{for(let e of I)e.destroy();$&&(cancelAnimationFrame($),$=null)},_.Easings={Linear:function(e){return e},EaseIn:function(e){return 0===e?0:Math.pow(2,10*e-10)},EaseOut:function(e){return 1===e?1:1-Math.pow(2,-10*e)},EaseInOut:function(e){return 0===e?0:1===e?1:e<.5?Math.pow(2,20*e-10)/2:(2-Math.pow(2,-20*e+10))/2}};let N=e=>{e.cancelable&&e.preventDefault()},q={passive:!1},B={panThreshold:5,swipeThreshold:3,ignore:["textarea","input","select","[contenteditable]","[data-selectable]","[data-draggable]"]},W=!1,Z=!0,G=(e,t)=>{let n,o,i,l={...B,...t},a=[],r=[],s=[],c=!1,u=!1,d=!1,f=0,g=0,p=0,m=0,h=0,v=0,y=0,b=0,E=0,w=[],x=0,M=0,L=new Map;function S(e){let t=j(r),l=j(s),d=Math.abs(y)>Math.abs(b)?y:b,f={srcEvent:i,isPanRecognized:c,isSwipeRecognized:u,firstTouch:a,previousTouch:s,currentTouch:r,deltaX:p,deltaY:m,offsetX:h,offsetY:v,velocityX:y,velocityY:b,velocity:d,angle:E,axis:o,scale:t&&l?t/l:0,center:n};for(let t of L.get(e)||[])t(f)}function T(e){let t=Date.now();w=w.filter(e=>!e.ts||e.ts>t-100),e&&w.push(e)}function R(){if(y=0,b=0,w.length>3){let e=w[0],t=w[w.length-1];if(e&&t){let n=t.x-e.x,o=t.y-e.y,i=e.ts&&t.ts?t.ts-e.ts:0;i>0&&(y=Math.abs(n)>3?n/(i/30):0,b=Math.abs(o)>3?o/(i/30):0)}}}function P(e){if(e instanceof MouseEvent){if(W)return}else W=!0;let t=e.composedPath()[0],o=l.ignore.join(",");if(t.matches(o)||t.closest(o)||"undefined"!=typeof MouseEvent&&e instanceof MouseEvent&&(!e.buttons||0!==e.button))return;e instanceof MouseEvent&&N(e);let p=Date.now(),m=p-(f||p);d=m>0&&m<=250,f=p,clearTimeout(x),i=e,e instanceof MouseEvent&&(window.addEventListener("mousemove",C),window.addEventListener("mouseup",O)),window.addEventListener("blur",A),a=[...r=D(e)],s=[],g=r.length,n=V(r),1===g&&(c=!1,u=!1),g&&T(V(r)),S("start")}function C(e){if(!a.length||e.defaultPrevented)return;i=e,s=[...r],g=(r=D(e)).length;let t=n=V(r),u=V(s);if(p=t.x-u.x,m=t.y-u.y,T(t),R(),S("move"),r.length>1&&Math.abs(j(r)-j(s))>=.1&&S("pinch"),!c&&a.length){let e=V(a);h=t.x-e.x,v=t.y-e.y,(c=Math.abs(h)>l.panThreshold||Math.abs(v)>l.panThreshold)&&(Z=!1,clearTimeout(M),M=0,o=(E=Math.abs(180*Math.atan2(v,h)/Math.PI))>45&&E<135?"y":"x",a=[...r],s=[...r],window.getSelection()?.removeAllRanges(),S("panstart"))}c&&(p||m)&&S("pan")}function O(e){if(i=e,!a.length)return;let t=D(e),o=H(e);if(g=t.length,n=V(o),o.length&&T(V(o)),R(),s=[...r],r=[...t],a=[...t],t.length>0)S("end"),c=!1,u=!1,w=[];else{let e=l.swipeThreshold;(Math.abs(y)>e||Math.abs(b)>e)&&(u=!0),c&&S("panend"),u&&S("swipe"),c||u||(S("tap"),d?S("doubleTap"):x=setTimeout(function(){S("singleTap")},250)),S("end"),z()}}function A(){clearTimeout(x),z(),c&&S("panend"),S("end")}function z(){c=!1,u=!1,d=!1,g=0,w=[],r=[],s=[],a=[],p=0,m=0,h=0,v=0,y=0,b=0,E=0,o=void 0,window.removeEventListener("mousemove",C),window.removeEventListener("mouseup",O),window.removeEventListener("blur",A),Z||M||(M=setTimeout(()=>{Z=!0,M=0},100))}function k(e){let t=e.target;W=!1,t&&!e.defaultPrevented&&(Z||(N(e),e.stopPropagation()))}let I={init:function(){if(e)return e.addEventListener("click",k,q),e.addEventListener("mousedown",P,q),e.addEventListener("touchstart",P,q),e.addEventListener("touchmove",C,q),e.addEventListener("touchend",O),e.addEventListener("touchcancel",O),I},on:function(e,t){return L.set(e,[...L.get(e)||[],t]),I},off:function(e,t){return L.has(e)&&L.set(e,L.get(e).filter(e=>e!==t)),I},isPointerDown:()=>g>0,destroy:function(){clearTimeout(x),clearTimeout(M),M=0,e&&(e.removeEventListener("click",k,q),e.removeEventListener("mousedown",P,q),e.removeEventListener("touchstart",P,q),e.removeEventListener("touchmove",C,q),e.removeEventListener("touchend",O),e.removeEventListener("touchcancel",O)),e=null,z()}};return I};G.isClickAllowed=()=>Z;let Y={IMAGE_ERROR:"This image couldn't be loaded. <br /> Please try again later.",MOVE_UP:"Move up",MOVE_DOWN:"Move down",MOVE_LEFT:"Move left",MOVE_RIGHT:"Move right",ZOOM_IN:"Zoom in",ZOOM_OUT:"Zoom out",TOGGLE_FULL:"Toggle zoom level",TOGGLE_1TO1:"Toggle zoom level",ITERATE_ZOOM:"Toggle zoom level",ROTATE_CCW:"Rotate counterclockwise",ROTATE_CW:"Rotate clockwise",FLIP_X:"Flip horizontally",FLIP_Y:"Flip vertically",RESET:"Reset"},X=1e4,U=e=>{e.cancelable&&e.preventDefault()},K=(e,t=X)=>Math.round(((e=parseFloat(e+"")||0)+Number.EPSILON)*t)/t,J=((S={}).Reset="reset",S.Zoom="zoom",S.ZoomIn="zoomIn",S.ZoomOut="zoomOut",S.ZoomTo="zoomTo",S.ToggleCover="toggleCover",S.ToggleFull="toggleFull",S.ToggleMax="toggleMax",S.IterateZoom="iterateZoom",S.Pan="pan",S.Swipe="swipe",S.Move="move",S.MoveLeft="moveLeft",S.MoveRight="moveRight",S.MoveUp="moveUp",S.MoveDown="moveDown",S.RotateCCW="rotateCCW",S.RotateCW="rotateCW",S.FlipX="flipX",S.FlipY="flipY",S),Q=((T={}).Cover="cover",T.Full="full",T.Max="max",T),ee={x:0,y:0,scale:1,angle:0,flipX:1,flipY:1},et=((R={})[R.Init=0]="Init",R[R.Loading=1]="Loading",R[R.Error=2]="Error",R[R.Ready=3]="Ready",R[R.Destroyed=4]="Destroyed",R),en={bounds:!0,classes:{container:"f-panzoom",wrapper:"f-panzoom__wrapper",content:"f-panzoom__content",viewport:"f-panzoom__viewport"},clickAction:J.ToggleFull,dblClickAction:!1,gestures:{},height:"auto",l10n:Y,maxScale:4,minScale:1,mouseMoveFactor:1,panMode:"drag",protected:!1,singleClickAction:!1,spinnerTpl:'<div class="f-spinner"></div>',wheelAction:J.Zoom,width:"auto"},eo=0,ei=0,el=0,ea=(e,n={},o={})=>{let i,l,c,d,f,g,m,v=et.Init,y={...en,...n},b={},E={...ee},w={...ee},x=[];function M(e){let t=y[e];return t&&"function"==typeof t?t(ep):t}let L=new Map;function S(e,...t){let n=L.get(e)||[];for(let o of(y.on&&n.push(y.on[e]),n))o&&o instanceof Function&&o(ep,...t);"*"!==e&&S("*",e,...t)}function T(e){if(v!==et.Ready||u(e.target))return;let t=Date.now(),n=p(-1,[-e.deltaX||0,-e.deltaY||0,-e.detail||0].reduce(function(e,t){return Math.abs(t)>Math.abs(e)?t:e}),1);S("wheel",e,n);let o=M("wheelAction");if(!o||e.defaultPrevented)return;let i=w.scale,l=i*(n>0?1.5:.5);if(o===J.Zoom){let o=100>Math.abs(e.deltaY)&&100>Math.abs(e.deltaX);if(t-ei<(o?200:45))return void U(e);ei=t;let a=$(),r=N();if(K(l)<K(a)&&K(i)<=K(a)?(el+=Math.abs(n),l=a):K(l)>K(r)&&K(i)>=K(r)?(el+=Math.abs(n),l=r):(el=0,l=p(a,l,r)),el>7)return}switch(U(e),o){case J.Pan:Z(o,{srcEvent:e,deltaX:-(2*e.deltaX),deltaY:-(2*e.deltaY)});break;case J.Zoom:Z(J.ZoomTo,{srcEvent:e,scale:l,center:{x:e.clientX,y:e.clientY}});break;default:Z(o,{srcEvent:e})}}function R(n){let o=n.composedPath()[0];if(!G.isClickAllowed()||!r(o)||n.defaultPrevented||!e?.contains(o)||o.hasAttribute("disabled")||o.hasAttribute("aria-disabled"))return;let l=o.closest("[data-panzoom-action]"),a=l?.dataset?.panzoomAction,s=l?.dataset?.panzoomValue||"";if(a){switch(a){case J.ZoomTo:case J.ZoomIn:case J.ZoomOut:Z(a,{scale:parseFloat(s||"")||void 0});break;case J.MoveLeft:case J.MoveRight:Z(a,{deltaX:parseFloat(s||"")||void 0});break;case J.MoveUp:case J.MoveDown:Z(a,{deltaY:parseFloat(s||"")||void 0});break;default:Z(a)}return}if(!i?.contains(o))return;let c={srcEvent:n};if(Z(M("clickAction"),c),M("dblClickAction")){let e=Date.now(),n=e-(eo||e);eo=e,n>0&&n<=250?(t&&(clearTimeout(t),t=void 0),Z(M("dblClickAction"),c)):t=setTimeout(()=>{Z(M("singleClickAction"),c)},250)}}function P(e){if(m=e,!z()||v!==et.Ready||E.scale<=1||w.scale<=1||(i?.dataset.animationName||"").indexOf("zoom")>-1)return;let t=k(w.scale);if(!t)return;let{x:n,y:o}=t;Z(J.Pan,{deltaX:n-w.x,deltaY:o-w.y})}function C(){if(e&&(e.querySelector(".f-spinner")?.remove(),e.classList.remove("is-loading")),!e||!i)return;if(l instanceof HTMLImageElement&&!(l.complete&&l.naturalWidth)){v=et.Error,i?.classList.add("has-error"),S("error");return}S("loaded");let{width:t,height:n}=A();l&&(l.setAttribute("width",t+""),l.setAttribute("height",n+"")),i&&(i.classList.remove("has-error"),i.setAttribute("width",t+""),i.setAttribute("height",n+""),i.style.aspectRatio=`${t/n||""}`),f=_().on("start",(e,t)=>{w={...ee,...t},void 0!==t.angle&&(t.angle=90*Math.round(t.angle/90)),void 0!==t.flipX&&(t.flipX=t.flipX>0?1:-1),void 0!==t.flipY&&(t.flipY=t.flipY>0?1:-1),W(),S("animationStart")}).on("pause",e=>{w={...ee,...e}}).on("step",t=>{if(v!==et.Ready||!f)return;if(!e||!e.parentElement)return void f.end();if(E={...ee,...t},z()||!M("bounds")||d?.isPointerDown()||w.scale>E.scale||w.scale<F())return void Y();let n=q(w.scale),o=!1,i=!1,l=!1,a=!1;E.x<n.x[0]&&(o=!0),E.x>n.x[1]&&(i=!0),E.y<n.y[0]&&(a=!0),E.y>n.y[1]&&(l=!0);let r=!1,s=!1,c=!1,u=!1;w.x<n.x[0]&&(r=!0),w.x>n.x[1]&&(s=!0),w.y<n.y[0]&&(u=!0),w.y>n.y[1]&&(c=!0);let g=!1;(i&&s||o&&r)&&(w.x=p(n.x[0],w.x,n.x[1]),g=!0),(l&&c||a&&u)&&(w.y=p(n.y[0],w.y,n.y[1]),g=!0),g&&f.spring({tension:94,friction:17,maxSpeed:555*w.scale,restDelta:.1,restSpeed:.1,velocity:f.getCurrentVelocities()}).from(E).to(w).start(),Y()}).on("end",()=>{B(),f?.isRunning()||(W(),S("animationEnd"))}),function(){let e=M("gestures");e&&c&&l&&(d=G(c,e).on("start",e=>{if(!f)return;let t=e.srcEvent;z()||((E.scale>1||e.currentTouch.length>1)&&(t?.stopPropagation(),f.pause()),1===e.currentTouch.length&&S("touchStart"))}).on("move",e=>{!z()&&(1!==w.scale||e.currentTouch.length>1)&&(e.srcEvent.preventDefault(),e.srcEvent.stopPropagation())}).on("pan",e=>{if(z())return;let t=e.srcEvent;(1!==w.scale||e.currentTouch.length>1)&&(U(t),Z(J.Pan,e))}).on("swipe",e=>{!z()&&w.scale>1&&Z(J.Swipe,e)}).on("tap",e=>{S("click",e)}).on("singleTap",e=>{S("singleClick",e)}).on("doubleTap",e=>{S("dblClick",e)}).on("pinch",e=>{z()||(e.scale>F()?Z(J.ZoomIn,e):e.scale<F()?Z(J.ZoomOut,e):Z(J.Pan,e))}).on("end",e=>{z()||(e.currentTouch.length?(e.srcEvent.stopPropagation(),U(e.srcEvent),f?.end()):(W(),B(),S("touchEnd")))}).init())}(),c&&(c.addEventListener("wheel",T,{passive:!1}),x.push(()=>{c?.removeEventListener("wheel",T,{passive:!1})})),e?.addEventListener("click",R),document?.addEventListener("mousemove",P),x.push(()=>{e?.removeEventListener("click",R),document?.removeEventListener("mousemove",P)});let o={...M("startPos")||{},...{scale:F()}};if(E={...ee,...o},w={...ee,...o},z()){let e=k(w.scale);if(e){let{x:t,y:n}=e;E.x=t,E.y=n,w.x=t,w.y=n}}v=et.Ready,Y(),W(),S("ready"),requestAnimationFrame(()=>{c&&(c.style.visibility="")})}function O(){let e={top:0,left:0,width:0,height:0};if(i){let t=i.getBoundingClientRect();w.angle%180==90?(e.top=t.top+.5*t.height-.5*t.width,e.left=t.left+.5*t.width-.5*t.height,e.width=t.height,e.height=t.width):(e.top=t.top,e.left=t.left,e.width=t.width,e.height=t.height)}return e}function A(){let e=M("width"),t=M("height");if(l&&"auto"===e){let t=l.getAttribute("width");e=t?parseFloat(t+""):void 0!==l.dataset.width?parseFloat(l.dataset.width+""):c instanceof HTMLImageElement?c.naturalWidth:l instanceof HTMLImageElement?l.naturalWidth:l.getBoundingClientRect().width}else e=a(e)?parseFloat(e):e;if(l&&"auto"===t){let e=l.getAttribute("height");t=e?parseFloat(e+""):void 0!==l.dataset.height?parseFloat(l.dataset.height+""):c instanceof HTMLImageElement?c.naturalHeight:l instanceof HTMLImageElement?l.naturalHeight:l.getBoundingClientRect().height}else t=a(t)?parseFloat(t):t;return{width:e,height:t}}function z(){return"mousemove"===M("panMode")&&matchMedia("(hover: hover)").matches}function k(e){let t=m||M("event"),n=i?.getBoundingClientRect();if(!t||!n||e<=1)return{x:0,y:0};let o=(t.clientX||0)-n.left,l=(t.clientY||0)-n.top,a=n.width,r=n.height,s=q(e);if(e>1){let t=M("mouseMoveFactor");t>1&&(e*=t)}let c=a*e,u=r*e,d=(c-a)*.5-o/a*100/100*(c-a),f=(u-r)*.5-l/r*100/100*(u-r);return{x:d=p(s.x[0],d,s.x[1]),y:f=p(s.y[0],f,s.y[1])}}function I(t="base"){if(!e)return 1;let n=e.getBoundingClientRect(),o=O(),{width:i,height:l}=A(),a=e=>{if("number"==typeof e)return e;switch(e){case"min":case"base":return 1;case"cover":return Math.max(n.height/o.height,n.width/o.width)||1;case"full":case"max":{let e=w.angle%180==90?l:i;return e&&o.width?e/o.width:1}}},r=M("minScale"),s=M("maxScale"),c=Math.min(a("full"),a(r)),u="number"==typeof s?a("full")*s:Math.min(a("full"),a(s));switch(t){case"min":return c;case"base":return p(c,1,u);case"cover":return a("cover");case"full":return Math.min(u,a("full"));case"max":return u}}function $(){return I("min")}function F(){return I("base")}function D(){return I("cover")}function j(){return I("full")}function N(){return I("max")}function q(t){let n={x:[0,0],y:[0,0]},o=e?.getBoundingClientRect();if(!o)return n;let i=O(),l=o.width,a=o.height,r=i.width,s=i.height,c=t=void 0===t?w.scale:t,u=t;if(z()&&t>1){let e=M("mouseMoveFactor");e>1&&(r*t>l+.01&&(c*=e),s*t>a+.01&&(u*=e))}return r*=c,s*=u,t>1&&(r>l&&(n.x[0]=(l-r)*.5,n.x[1]=(r-l)*.5),n.x[0]-=(i.left-o.left)*.5,n.x[1]-=(i.left-o.left)*.5,n.x[0]-=(i.left+i.width-o.right)*.5,n.x[1]-=(i.left+i.width-o.right)*.5,s>a&&(n.y[0]=(a-s)*.5,n.y[1]=(s-a)*.5),n.y[0]-=(i.top-o.top)*.5,n.y[1]-=(i.top-o.top)*.5,n.y[0]-=(i.top+i.height-o.bottom)*.5,n.y[1]-=(i.top+i.height-o.bottom)*.5),n}function B(){if(!M("bounds")||v!==et.Ready||!e?.parentElement||!f)return;let t=$(),n=N(),o=p(t,w.scale,n);if(w.scale<t-.01||w.scale>n+.01)return void Z(J.ZoomTo,{scale:o});if(f.isRunning()||d?.isPointerDown())return;let i=q(o);w.x<i.x[0]||w.x>i.x[1]||w.y<i.y[0]||w.y>i.y[1]?(w.x=p(i.x[0],w.x,i.x[1]),w.y=p(i.y[0],w.y,i.y[1]),f.spring({tension:170,friction:17,restDelta:.001,restSpeed:.001,maxSpeed:1/0,velocity:f.getCurrentVelocities()}),f.from(E).to(w).start()):Y()}function W(){if(!e||!e.parentElement||!i)return;let t=eu(),n=ed(),o=ef(),l=eg(),a=ea(),r=er();i.classList.toggle("is-fullsize",l),i.classList.toggle("is-expanded",o),i.classList.toggle("is-dragging",n),i.classList.toggle("can-drag",t),i.classList.toggle("will-zoom-in",a),i.classList.toggle("will-zoom-out",r);let s=es(),c=ec(),u=v!==et.Ready;for(let t of e?.querySelectorAll("[data-panzoom-action]")||[]){let e=t.dataset.panzoomAction,n=!1;if(u)n=!0;else switch(e){case J.ZoomIn:s||(n=!0);break;case J.ZoomOut:c||(n=!0);break;case J.ToggleFull:s||c||(n=!0);let o=t.querySelector("g");o&&(o.style.display=l?"none":"");break;case J.ToggleCover:case J.ToggleMax:s||c||(n=!0)}n?(t.setAttribute("aria-disabled",""),t.setAttribute("tabindex","-1")):(t.removeAttribute("aria-disabled"),t.removeAttribute("tabindex"))}}function Z(t,n){if(!e||!l||!f||t===J.Swipe&&Math.abs(f.getCurrentVelocities().scale)>.01)return;let o={...w},i=q(z()?w.scale:E.scale),a=f.getCurrentVelocities(),r=O();n=n||{};let s=(n.currentTouch?.length||0)>1,c=n.velocityX||0,u=n.velocityY||0,g=n.center;!g&&n.srcEvent&&(g=V(H(n.srcEvent)));let m=n.deltaX||0,h=n.deltaY||0;switch(t){case J.MoveRight:m=n.deltaX||100;break;case J.MoveLeft:m=n.deltaX||-100;break;case J.MoveUp:h=n.deltaY||-100;break;case J.MoveDown:h=n.deltaY||100}let v=[];switch(t){case J.Reset:(w={...ee}).scale=F();break;case J.Pan:case J.Move:case J.MoveLeft:case J.MoveRight:case J.MoveUp:case J.MoveDown:if(d?.isPointerDown()){let e=1,t=1;w.x<=i.x[0]&&c<=0&&(e=.2*Math.max(.01,1-Math.abs(1/r.width*Math.abs(w.x-i.x[0])))),w.x>=i.x[1]&&c>=0&&(e=.2*Math.max(.01,1-Math.abs(1/r.width*Math.abs(w.x-i.x[1])))),w.y<=i.y[0]&&u<=0&&(t=.2*Math.max(.01,1-Math.abs(1/r.height*Math.abs(w.y-i.y[0])))),w.y>=i.y[1]&&u>=0&&(t=.2*Math.max(.01,1-Math.abs(1/r.height*Math.abs(w.y-i.y[1])))),w.x+=m*e,w.y+=h*t}else w.x=p(i.x[0],w.x+m,i.x[1]),w.y=p(i.y[0],w.y+h,i.y[1]);break;case J.Swipe:let y=(e=0)=>Math.sign(e)*Math.pow(Math.abs(e),1.5);w.x+=p(-1e3,y(c),1e3),w.y+=p(-1e3,y(u),1e3),u&&!c&&(w.x=p(i.x[0],w.x,i.x[1])),!u&&c&&(w.y=p(i.y[0],w.y,i.y[1])),a.x=c,a.y=u;break;case J.ZoomTo:w.scale=n.scale||1;break;case J.ZoomIn:w.scale=w.scale*(n.scale||2),s||(w.scale=Math.min(w.scale,N()));break;case J.ZoomOut:w.scale=w.scale*(n.scale||.5),s||(w.scale=Math.max(w.scale,$()));break;case J.ToggleCover:v=[F(),D()];break;case J.ToggleFull:v=[F(),j()];break;case J.ToggleMax:v=[F(),N()];break;case J.IterateZoom:v=[F(),j(),N()];break;case J.Zoom:let b=j();w.scale>=b-.05?w.scale=F():w.scale=Math.min(b,w.scale*(n.scale||2));break;case J.RotateCW:w.angle+=90;break;case J.RotateCCW:w.angle-=90;break;case J.FlipX:w.flipX*=-1;break;case J.FlipY:w.flipY*=-1}if(void 0!==E.angle&&Math.abs(E.angle)>=360&&(w.angle-=360*Math.floor(E.angle/360),E.angle-=360*Math.floor(E.angle/360)),v.length){let e=v.findIndex(e=>e>w.scale+1/X);w.scale=v[e]||v[0]}if(s&&(w.scale=p($()*(s?.8:1),w.scale,N()*(s?1.6:1))),z()){let e=k(w.scale);if(e){let{x:t,y:n}=e;w.x=t,w.y=n}}else if(w.scale!==o.scale){let t=0,n=0;if(g)t=g.x,n=g.y;else{let o=e.getBoundingClientRect();t=o.x+.5*o.width,n=o.y+.5*o.height}let l=t-r.left,a=n-r.top;l-=.5*r.width,a-=.5*r.height;let c=(l-o.x)/o.scale,u=(a-o.y)/o.scale;w.x=l-c*w.scale,w.y=a-u*w.scale,!s&&M("bounds")&&(i=q(w.scale),w.x=p(i.x[0],w.x,i.x[1]),w.y=p(i.y[0],w.y,i.y[1]))}if(t===J.Swipe){let e=500*w.scale;f.spring({tension:94,friction:17,maxSpeed:e,restDelta:.1,restSpeed:.1,velocity:a})}else t===J.Pan||s?f.spring({tension:750,friction:17,restDelta:.01,restSpeed:.01,maxSpeed:1}):f.spring({tension:170,friction:17,restDelta:.001,restSpeed:.001,maxSpeed:1/0,velocity:a});t===J.Reset&&0===n.velocity?E={...w}:f.from(E).to(w).start(),S("action",t)}function Y(){if(!i||!l)return;if(l instanceof HTMLImageElement){let{width:e,height:t}=A();i.style.maxWidth=`min(${e}px, 100%)`,i.style.maxHeight=`min(${t}px, 100%)`}let{x:t,y:n,scale:o,angle:a,flipX:r,flipY:s}=E,u=`translate3d(${t}px, ${n}px, 0)`;1!==r||1!==s?u+=` scaleX(${o*r}) scaleY(${o*s})`:1!==o&&(u+=` scale(${o})`),a%360!=0&&(u+=` rotate(${a}deg)`);let d=function(){let t=O(),n=t.width,o=t.height,{width:i,height:l}=A();if(!e)return{x:0,y:0,width:0,height:0,scale:0,flipX:0,flipY:0,angle:0,fitWidth:n,fitHeight:o,fullWidth:i,fullHeight:l};let{x:a,y:r,scale:s,angle:c,flipX:u,flipY:d}=E,f=1/j(),g=i,p=l,m=E.scale*f,h=w.scale*f,v=Math.max(n,o),y=Math.min(n,o);i>l?(g=v,p=y):(g=y,p=v),m=i>l?v*s/i||1:v*s/l||1;let b=g?i*h:0,x=p?l*h:0,M=g&&p?i*m/b:0;return{x:a=a+.5*g-.5*b,y:r=r+.5*p-.5*x,width:b,height:x,scale:M,flipX:u,flipY:d,angle:c,fitWidth:n,fitHeight:o,fullWidth:i,fullHeight:l}}();if(i&&d){let{x:e,y:t,width:n,height:o,scale:i,flipX:l,flipY:r}=d,s=`translate(${K(e)}px, ${K(t)}px)`;1!==l||1!==r?s+=` scaleX(${K(i*l)}) scaleY(${K(i*r)})`:s+=` scale(${K(i)})`,0!==a&&(s+=` rotate(${a}deg)`),c&&(c.style.width=`${K(n)}px`,c.style.height=`${K(o)}px`,c.style.transform=`${s}`)}S("render")}function Q(){let e=w.scale,t=void 0,n=M("clickAction"),o=F();if(n){let i=[];switch(n){case J.ZoomIn:o=e*(t||2);break;case J.ZoomOut:o=e*(t||.5);break;case J.ToggleCover:i=[F(),D()];break;case J.ToggleFull:i=[F(),j()];break;case J.ToggleMax:i=[F(),N()];break;case J.IterateZoom:i=[F(),j(),N()];break;case J.Zoom:let l=j();o=e>=l-.05?F():Math.min(l,e*(t||2))}if(i.length){let t=i.findIndex(t=>t>e+1/X);o=i[t]||F()}}return p($(),o,N())}function ea(){return v===et.Ready&&Q()>w.scale}function er(){return v===et.Ready&&Q()<w.scale}function es(){return v===et.Ready&&w.scale<N()}function ec(){return v===et.Ready&&w.scale>$()}function eu(){return v===et.Ready&&ef()&&!!d&&!z()}function ed(){return v===et.Ready&&d?.isPointerDown()&&!z()}function ef(){return v===et.Ready&&w.scale>F()}function eg(){return v===et.Ready&&w.scale>=j()}let ep={canDrag:eu,canZoomIn:es,canZoomOut:ec,destroy:function(){for(let e of(S("destroy"),Object.values(b)))e?.destroy(ep);for(let e of x)e();return i&&(i.style.aspectRatio="",i.style.maxWidth="",i.style.maxHeight=""),c&&(c.style.width="",c.style.height="",c.style.transform=""),i=void 0,l=void 0,c=void 0,E={...ee},w={...ee},f?.destroy(),f=void 0,d?.destroy(),d=void 0,v=et.Destroyed,ep},emit:S,execute:Z,getBoundaries:q,getContainer:function(){return e},getFullDim:A,getGestures:function(){return d},getMousemovePos:k,getOptions:function(){return y},getScale:I,getState:function(){return v},getTransform:function(e){return!0===e?w:E},getTween:function(){return f},getViewport:function(){return c},getWrapper:function(){return i},init:function(){return v=et.Init,S("init"),function(){for(let[e,t]of Object.entries({...o,...y.plugins||{}}))if(e&&!b[e]&&t instanceof Function){let n=t();n.init(ep),b[e]=n}S("initPlugins")}(),function(){if(!e)return;let t={...en.classes,...M("classes")};if((h(e,t.container),l=e.querySelector("."+t.content))&&(l.setAttribute("draggable","false"),(i=e.querySelector("."+t.wrapper))||(h(i=document.createElement("div"),t.wrapper),l.insertAdjacentElement("beforebegin",i),i.insertAdjacentElement("afterbegin",l)),l instanceof HTMLImageElement||l instanceof HTMLPictureElement)){if(!(c=e.querySelector("."+t.viewport))){h(c=document.createElement("div"),t.viewport);let e=l.cloneNode(!0);e.classList.remove("is-lazyloading"),e.classList.remove("is-lazyloaded"),c.insertAdjacentElement("afterbegin",e),i.insertAdjacentElement("beforeend",c)}if(l instanceof HTMLPictureElement&&(l=l.querySelector("img")),c instanceof HTMLPictureElement&&(c=c.querySelector("img")),c.style.visibility="hidden",M("protected")){c.addEventListener("contextmenu",e=>{e.preventDefault()});let e=document.createElement("div");h(e,"f-panzoom__protected"),c.appendChild(e)}S("initLayout")}}(),function(){if(!(l&&l instanceof HTMLImageElement))return;v=et.Loading,S("loading");let t=()=>{l&&l instanceof HTMLImageElement&&l.decode().then(()=>{requestAnimationFrame(()=>{C()})}).catch(()=>{C()})};if(l.src&&l.complete)return t();(function(){let t=e?.querySelector(".f-spinner");if(!e||t)return;let n=s(M("spinnerTpl"));n&&(n.classList.add("f-spinner"),e.classList.add("is-loading"),i?.insertAdjacentElement("afterbegin",n))})(),l.addEventListener("load",t,!1),l.addEventListener("error",t,!1),x.push(()=>{l?.removeEventListener("load",t,!1),l?.removeEventListener("error",t,!1)})}(),function(){if(e&&i&&!g){let t=null;(g=new ResizeObserver(()=>{t||(t=requestAnimationFrame(()=>{e&&e.parentElement&&v===et.Ready&&(W(),B(),S("refresh")),t=null}))})).observe(i),x.push(()=>{g?.disconnect(),g=void 0,t&&(cancelAnimationFrame(t),t=null)})}}(),ep},isDragging:ed,isExpanded:ef,isFullsize:eg,localize:function(e,t=[]){let n=M("l10n")||{};e=String(e).replace(/\{\{(\w+)\}\}/g,(e,t)=>n[t]||e);for(let n=0;n<t.length;n++)e=e.split(t[n][0]).join(t[n][1]);return e=e.replace(/\{\{(.*?)\}\}/g,(e,t)=>t)},off:function(e,t){for(let n of e instanceof Array?e:[e])L.has(n)&&L.set(n,L.get(n).filter(e=>e!==t));return ep},on:function(e,t){for(let n of e instanceof Array?e:[e])L.set(n,[...L.get(n)||[],t]);return ep},version:"6.0.18",willZoomIn:ea,willZoomOut:er};return ep};ea.l10n={en_EN:Y},ea.getDefaults=()=>en;let er=(e,t)=>{let n=[];return e.childNodes.forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&(!t||e.matches(t))&&n.push(e)}),n},es=(e,t="")=>{e&&e.classList&&t.split(" ").forEach(t=>{t&&e.classList.remove(t)})},ec=(e,t="",n)=>{e&&e.classList&&t.split(" ").forEach(t=>{t&&e.classList.toggle(t,n||!1)})},eu={...Y,ERROR:"Something went wrong. <br /> Please try again later.",NEXT:"Next page",PREV:"Previous page",GOTO:"Go to page #%d",DOWNLOAD:"Download",TOGGLE_FULLSCREEN:"Toggle full-screen mode",TOGGLE_EXPAND:"Toggle full-size mode",TOGGLE_THUMBS:"Toggle thumbnails",TOGGLE_AUTOPLAY:"Toggle slideshow"},ed=e=>{e.cancelable&&e.preventDefault()},ef=((P={})[P.Init=0]="Init",P[P.Ready=1]="Ready",P[P.Destroyed=2]="Destroyed",P),eg=((C={})[C.Loading=0]="Loading",C[C.Loaded=1]="Loaded",C[C.Error=2]="Error",C),ep={adaptiveHeight:!1,center:!0,classes:{container:"f-carousel",isEnabled:"is-enabled",isLTR:"is-ltr",isRTL:"is-rtl",isHorizontal:"is-horizontal",isVertical:"is-vertical",hasAdaptiveHeight:"has-adaptive-height",viewport:"f-carousel__viewport",slide:"f-carousel__slide",isSelected:"is-selected"},dragFree:!1,enabled:!0,errorTpl:'<div class="f-html">{{ERROR}}</div>',fill:!1,infinite:!0,initialPage:0,l10n:eu,rtl:!1,slides:[],slidesPerPage:"auto",spinnerTpl:'<div class="f-spinner"></div>',transition:"fade",tween:{clamp:!0,mass:1,tension:200,friction:25,restDelta:1,restSpeed:1,velocity:0},vertical:!1},em=0,eh=(e,t={},o={})=>{let i,c,d,g,v;em++;let y=ef.Init,b={...ep},E={...ep},w={},x=null,M=null,L=!1,S=!1,T=!1,R=!1,P="height",C=0,O=!0,A=0,z=0,k=0,I=0,$="*",F=[],D=[],H=new Set,V=[],j=[],N=0,q=0;function B(e,...t){let n=E[e];return n&&n instanceof Function?n(eO,...t):n}function W(e,t=[]){let n=B("l10n")||{};e=String(e).replace(/\{\{(\w+)\}\}/g,(e,t)=>n[t]||e);for(let n=0;n<t.length;n++)e=e.split(t[n][0]).join(t[n][1]);return e=e.replace(/\{\{(.*?)\}\}/g,(e,t)=>t)}let Z=new Map;function Y(e,...t){let n=Z.get(e)||[];for(let o of(E.on&&n.push(E.on[e]),n))o&&o instanceof Function&&o(eO,...t);"*"!==e&&Y("*",e,...t)}function X(){let e=f({},ep,b);f(e,ep,b);let t="",n=b.breakpoints||{};if(n)for(let[o,i]of Object.entries(n))window.matchMedia(o).matches&&(t+=o,f(e,i));if(void 0===v||t!==v){if(v=t,y!==ef.Init){let t=j[A]?.slides[0]?.index;for(let n of(void 0===t&&(t=E.initialSlide),e.initialSlide=t,e.slides=[],F))n.isVirtual&&e.slides.push(n)}eC(),!1!==(E=e).enabled&&(y=ef.Init,Y("init"),function(){for(let[e,t]of Object.entries({...o,...E.plugins||{}}))if(e&&!w[e]&&t instanceof Function){let n=t();n.init(eO,eh),w[e]=n}Y("initPlugins")}(),function(){if(!x)return;let e=B("classes")||{};h(x,e.container),h(x,e.isEnabled);let t=B("style");if(t&&l(t))for(let[e,n]of Object.entries(t))x.style.setProperty(e,n);(M=x.querySelector(`.${e.viewport}`))||(h(M=document.createElement("div"),e.viewport),M.append(...er(x,`.${e.slide}`)),x.insertAdjacentElement("afterbegin",M)),L="visible"===window.getComputedStyle(M).getPropertyValue("overflow"),x.carousel=eO,Y("initLayout")}(),function(){if(!M)return;let e=B("classes")||{};for(let t of(F=[],[...er(M,`.${e.slide}`)].forEach(e=>{e.parentElement&&(F.push(eu({el:e,isVirtual:!1,...e.dataset||{}})),e.parentElement.removeChild(e))}),ea(B("slides")),F))Y("addSlide",t);Y("initSlides")}(),c=_().on("start",()=>{i&&i.isPointerDown()||(J(),eP())}).on("step",e=>{let t=C;(C=e.pos)!==t&&(O=!1,eP())}).on("end",e=>{!i?.isPointerDown()&&(C=e.pos,c&&!S&&(C<k||C>I)?c.spring({clamp:!0,mass:1,tension:200,friction:25,velocity:0,restDelta:1,restSpeed:1}).from({pos:C}).to({pos:p(k,C,I)}).start():O||(O=!0,Y("settle")))}),function(){let e=B("gestures");M&&!1!==e&&(i=G(M,e).on("start",e=>{if(!c)return;let{srcEvent:t}=e;R&&ed(t),c.pause(),c.getCurrentVelocities().pos=0;let n=j[A]?.slides[0];n&&H.has(n.index)&&n.el&&(C=(n.offset||0)+(function(e){let t=new DOMMatrixReadOnly(window.getComputedStyle(e).transform);return{width:t.m41||0,height:t.m42||0}}(n.el)[P]||0)*(T&&!R?1:-1)),ew(),!S&&(C<k||C>I)&&c.spring({clamp:!0,mass:1,tension:500,friction:25,velocity:c.getCurrentVelocities()?.pos||0,restDelta:1,restSpeed:1}).from({pos:C}).to({pos:p(k,C,I)}).start()}).on("move",e=>{let{srcEvent:t,axis:n}=e,o=e.srcEvent.target;o&&u(o)||(n||(t.stopPropagation(),t.stopImmediatePropagation()),("y"===n&&R||"x"===n&&!R)&&(ed(t),t.stopPropagation()))}).on("panstart",e=>{e?.axis===(R?"y":"x")&&h(M,"is-dragging")}).on("panend",()=>{es(M,"is-dragging")}).on("pan",e=>{let{deltaX:t,deltaY:n,currentTouch:o,axis:i}=e;if(!c||o.length>1||"y"===i&&!R||"x"===i&&R)return;let l=T&&!R?1:-1,a=R?n:t,r=c?.isRunning()?c.getEndValues().pos:C,s=1;!S&&(r<=k&&a*l<0?s=.2*Math.max(.01,1-Math.abs(1/eo()*Math.abs(r-k))):r>=I&&a*l>0&&(s=.2*Math.max(.01,1-Math.abs(1/eo()*Math.abs(r-I))))),r+=a*s*l,c.spring({clamp:!0,mass:1,tension:700,friction:25,velocity:c.getCurrentVelocities()?.pos||0,restDelta:1,restSpeed:1}).from({pos:C}).to({pos:r}).start()}).on("end",e=>{let{axis:t,velocityX:n,velocityY:o,currentTouch:i}=e,l=j.length,a=B("dragFree");if(i.length>0||!c||!l)return;let r=B("vertical")?o:n,s=c?.isRunning()?c.getEndValues().pos:C,u=T&&!R?1:-1;if(s+=r*(a?5:1)*u,!S&&(r*u<=0&&s<k||r*u>=0&&s>I)){let e=0;Math.abs(r)>0&&(e=2*Math.abs(r),e=Math.min(.3*eo(),e)),s=p(k+-1*e,s,I+e),c.spring({clamp:!0,mass:1,tension:380,friction:25,velocity:-1*r,restDelta:1,restSpeed:1}).from({pos:C}).to({pos:s}).start();return}if(a||w.Autoscroll?.isEnabled())return void(Math.abs(r)>10?c.spring({clamp:!0,mass:1,tension:150,friction:25,velocity:-1*r,restDelta:1,restSpeed:1}).from({pos:C}).to({pos:s}).start():c.isRunning()||O||(O=!0,Y("settle")));if(!(a||w.Autoscroll?.isEnabled())&&(!(e.offsetX||e.offsetY)||"y"===t&&!R||"x"===t&&R))return void eR(A,{transition:"tween"});let d=et(s);Math.abs(r)>10&&d===A&&(r>0?d+=T&&!R?1:-1:d+=T&&!R?-1:1),eR(d,{transition:"tween",tween:{tension:160,friction:25,velocity:-1*r}})}).init())}(),eb(),function(){if(x&&(x.addEventListener("click",eM,{passive:!1}),document.addEventListener("mousemove",U),!d)){let e=null;(d=new ResizeObserver(t=>{e||(e=requestAnimationFrame(()=>{(function(e){if(!x)return;let t=e[0].contentBoxSize[0].blockSize,n=e[0].contentBoxSize[0].inlineSize;if(y===ef.Init){N=t,q=n,y=ef.Ready,eP(),Q(),Y("ready");return}if(y!==ef.Ready)return;let o=j.length;eb();let l=x.getBoundingClientRect();if(t=l.height,n=l.width,!(o>1&&(R&&.5>Math.abs(t-N)||!R&&.5>Math.abs(n-q))))N=t,q=n,(!R||t)&&(R||n)&&x&&M&&(o===j.length&&i?.isPointerDown()||(B("dragFree")&&(S||C>k&&C<I)?(J(),eP()):eR(A,{transition:!1})))})(t),e=null}))})).observe(x)}}())}}function U(e){n=e}function K(e="*"){let t=[];for(let n of F)("*"===e||n.class&&n.class.includes(e)||n.el&&n.el?.classList.contains(e))&&t.push(n);g=void 0,$=e,D=[...t]}function J(){if(!c)return;let e=et(c?.isRunning()?c.getEndValues().pos:C);e!==A&&(g=A,A=e,eT(),Q(),ee(),Y("change",A,g))}function Q(){if(!x)return;for(let e of(ec(M,"is-draggable",!!i&&j.length>0),x.querySelectorAll("[data-carousel-index]")))e.innerHTML=A+"";for(let e of x.querySelectorAll("[data-carousel-page]"))e.innerHTML=A+1+"";for(let e of x.querySelectorAll("[data-carousel-pages]"))e.innerHTML=j.length+"";let e=!1,t=j[A]?.slides[0];for(let n of(t&&(t.downloadSrc||"image"===t.type&&t.src)&&(e=!0),x.querySelectorAll("[data-carousel-download]")))n.toggleAttribute("aria-disabled",!e)}function ee(e){if(!x)return;e||(e=j[A]?.slides[0]);let t=e.el;if(t)for(let n of t.querySelectorAll("[data-slide-index]"))n.innerHTML=e.index+1+""}function et(e){if(!j.length||!c)return 0;let t=ei(),n=e;S?n-=Math.floor((e-j[0].pos)/t)*t:n=p(j[0].pos,e,j[j.length-1].pos);let o=new Map,i=0;for(let e of j){let l=Math.abs(e.pos-n),a=Math.min(l,Math.abs(e.pos-n-t),Math.abs(e.pos-n+t));o.set(i,a),i++}return parseInt((o.size>0?[...o.entries()].reduce((e,t)=>t[1]<e[1]?t:e):[A,0])[0])}function en(){return M&&parseFloat(getComputedStyle(M).getPropertyValue("--f-carousel-gap"))||0}function eo(){return M&&M.getBoundingClientRect()[P]||0}function ei(e=!0){let t=en();return D.reduce((e,t)=>e+t.dim,0)+(D.length-(S&&e?0:1))*t}function el(e){let t=en(),n=ei(),o=eo();if(!M)return[];let i=[];if(!n||!o)return[];e=void 0===e?C:e,S&&(e-=Math.floor(e/n)*n);let l=0,a=0;if(L){let e=M.getBoundingClientRect();l=e.left,a=e.right-e.width}let r=0;for(let s of D){let c=(t=0)=>{!(i.indexOf(s)>-1)&&(s.pos=r-e+t||0,s.offset+t>e-s.dim-l+.51&&s.offset+t<e+o+a-.51&&i.push(s))};if(s.offset=r,S)for(let e=-1;e<=1;e++)c(n*e);else c();r+=s.dim+t}return i}function ea(e,t){let n=[];for(let t of Array.isArray(e)?e:[e]){let e=eu({...t,isVirtual:!0});n.push(e)}for(let e of(F.splice(void 0===t?F.length:t,0,...n),ey(),n))!function(e){if(!e)return;let t=e.el;t||(e.el=t=document.createElement("div"));let n=e.html?e.html instanceof HTMLElement?e.html:s(e.html):void 0;n&&(h(n,"f-html"),e.htmlEl=n,h(t,"has-html"),t.append(n),Y("contentReady",e))}(e);return K($),n}function eu(e){return(a(e)||e instanceof HTMLElement)&&(e={html:e}),{index:-1,el:void 0,class:"",isVirtual:!0,dim:0,pos:0,offset:0,html:"",src:"",...e}}function eg(e){if(!M||!e)return;let t=e.el;if(t){if(t.setAttribute("index",e.index+""),t.parentElement!==M){let n;for(let o of(h(t,E.classes.slide),h(t,e.class),eT(e),F))if(o.index>e.index){n=o.el;break}M.insertBefore(t,n&&M.contains(n)?n:null),Y("attachSlideEl",e)}return t}}function ev(e){let t=e?.el;t&&(t.remove(),eE(t),Y("detachSlideEl",e))}function ey(){for(let e=0;e<F.length;e++){let t=F[e],n=t.el;n&&(t.index!==e&&eE(n),n.setAttribute("index",`${e}`)),t.index=e}}function eb(){if(!x||!M)return;T=B("rtl"),P=(R=B("vertical"))?"height":"width";let e=B("classes");ec(x,e.isLTR,!T),ec(x,e.isRTL,T),ec(x,e.isHorizontal,!R),ec(x,e.isVertical,R),ec(x,e.hasAdaptiveHeight,B("adaptiveHeight"));let t=M.getBoundingClientRect();if(!t.width&&!t.height)return;let n=function(){let e=0;if(M){let t=document.createElement("div");h(t,E.classes.slide),M.appendChild(t),e=t.getBoundingClientRect()[P],t.remove(),t=void 0}return e}();for(let e of D){let t=e.el,o=0;if(!e.isVirtual&&t&&r(t)){let e=!1;t.parentElement&&t.parentElement===M||(M.appendChild(t),e=!0),o=t.getBoundingClientRect()[P],e&&t.parentElement?.removeChild(t)}else o=n;e.dim=o}if(S=!1,B("infinite")){S=!0;let e=ei(),t=en(),n=eo();if(L){let e=M.getBoundingClientRect();n+=e.left,n+=e.right-e.width}for(let o=0;o<D.length;o++){let i=D[o].dim+t;if(e-i<n&&e-i-n<i){S=!1;break}}}if(!function(){let e;if(!x)return;ey();let t=eo(),n=en(),o=ei(!1),i=B("slidesPerPage");i="auto"===i?1/0:parseFloat(i+""),j=[];let l=0,a=0;for(let e of D)(!j.length||l+e.dim-t>.05||a>=i)&&(j.push({index:j.length,slides:[],dim:0,offset:0,pos:0}),l=0,a=0),j[j.length-1].slides.push(e),l+=e.dim+n,a++;let r=B("center"),s=B("fill"),c=0;for(let e of j){for(let t of(e.dim=(e.slides.length-1)*n,e.slides))e.dim+=t.dim;e.offset=c,e.pos=c,!1!==r&&(e.pos-=(t-e.dim)*.5),s&&!S&&o>t&&(e.pos=p(0,e.pos,o-t)),c+=e.dim+n}let u=[];for(let t of j){let n={...t};e&&n.pos===e.pos?(e.dim+=n.dim,e.slides=[...e.slides,...n.slides]):(e=n,n.index=u.length,u.push(n))}j=u,Q()}(),k=j[0]?.pos||0,I=j[j.length-1]?.pos||0,y===ef.Init){g=void 0,A=B("initialPage");let e=B("initialSlide")||void 0;void 0!==e&&(A=eO.getPageIndex(e)||0),A=p(0,A,j.length-1),z=C=j[A]?.pos||0}else{let e=c?.isRunning()?c.getEndValues().pos:C;(e<k||e>I)&&(A=p(0,A,j.length-1),z=j[A||0].pos||0)}Y("refresh")}function eE(e){if(!e||!r(e))return;let t=parseInt(e.getAttribute("index")||"-1"),n="";for(let t of Array.from(e.classList)){let e=t.match(/^f-(\w+)(Out|In)$/);e&&e[1]&&(n=e[1]+"")}if(!e||!n)return;let o=[`f-${n}Out`,`f-${n}In`,"to-prev","to-next","from-prev","from-next"];e.removeEventListener("animationend",ex),es(e,o.join(" ")),H.delete(t)}function ew(){if(!M)return;let e=H.size;for(let e of D)eE(e.el);H.clear(),e&&eP()}function ex(e){"f-"===e.animationName.substring(0,2)&&(eE(e.target),!H.size&&(es(x,"in-transition"),!O&&.5>Math.abs(eO.getPosition(!0)-z)&&(O=!0,Y("settle"))),eP())}function eM(e){if(e.defaultPrevented)return;let t=e.composedPath()[0];if(t.closest("[data-carousel-go-prev]")){ed(e),eO.prev();return}if(t.closest("[data-carousel-go-next]")){ed(e),eO.next();return}let n=t.closest("[data-carousel-go-to]");if(n){ed(e),eO.goTo(parseFloat(n.dataset.carouselGoTo||"")||0);return}if(t.closest("[data-carousel-download]")){ed(e);let t=j[A].slides[0];if(t.downloadSrc||"image"===t.type&&t.src){let e=t.downloadFilename,n=document.createElement("a"),o=t.downloadSrc||t.src||"";n.href=o,n.target="_blank",n.download=e||o,n.click()}return}Y("click",e)}function eL(e){let t=e.el;t&&(t.querySelector(".f-spinner")?.remove(),es(t,"is-loading"))}function eS(e){let t=e.el;t&&(t.querySelector(".f-html.is-error")?.remove(),es(t,"has-error"))}function eT(e){e||(e=j[A]?.slides[0]);let t=e?.el;if(!t)return;let n=B("formatCaption",e);void 0===n&&(n=e.caption),n=n||"";let o=B("captionEl");if(o&&o instanceof HTMLElement){if(e.index!==A)return;if(a(n)&&(o.innerHTML=W(n+"")),n instanceof HTMLElement){if(n.parentElement===o)return;o.innerHTML="",n.parentElement&&(n=n.cloneNode(!0)),o.append(n)}return}if(!n)return;let i=e.captionEl||t.querySelector(".f-caption");!i&&n instanceof HTMLElement&&n.classList.contains("f-caption")&&(i=n),!i&&(h(i=document.createElement("div"),"f-caption"),a(n)?i.innerHTML=W(n+""):n instanceof HTMLElement&&(n.parentElement&&(n=n.cloneNode(!0)),i.append(n)));let l=`f-caption-${em}_${e.index}`;i.setAttribute("id",l),i.dataset.selectable="true",h(t,"has-caption"),t.setAttribute("aria-labelledby",l),e.captionEl=i,t.insertAdjacentElement("beforeend",i)}function eR(e,t){let{transition:n,tween:o}={...{transition:E.transition,tween:E.tween},...t||{}};if(!x||!c)return;let i=j.length;if(!i||function(e,t){if(!x||!c||!t||!a(t)||"tween"===t||j[A]?.slides.length>1)return!1;let n=j.length,o=e>A?1:-1;e=S?(e%n+n)%n:p(0,e,n-1),T&&(o*=-1);let i=j[A]?.slides[0],l=i?.index,r=j[e]?.slides[0],s=r?.index,u=j[e]?.pos;if(void 0===s||void 0===l||l===s||C===u||Math.abs(eo()-(r?.dim||0))>1)return!1;O=!1,c.pause(),ew(),h(x,"in-transition"),C=z=u;let d=eg(i),f=eg(r);return J(),d&&(H.add(l),d.style.transform="",d.addEventListener("animationend",ex),es(d,E.classes.isSelected),h(d,`f-${t}Out to-${o>0?"next":"prev"}`)),f&&(H.add(s),f.style.transform="",f.addEventListener("animationend",ex),h(f,E.classes.isSelected),h(f,`f-${t}In from-${o>0?"prev":"next"}`)),eP(),!0}(e,n))return;z=j[(e=S?(e%i+i)%i:p(0,e,i-1))||0].pos||0;let r=c.isRunning()?c.getEndValues().pos:C;if(1>Math.abs(z-r)){C=z,A!==e&&(eT(),Q(),ee(),g=A,Y("change",A=e,g)),eP(),O||(O=!0,Y("settle"));return}if(c.pause(),ew(),S){let e=ei(),t=Math.floor((r-j[0].pos)/e),n=z+t*e,o=n-e;z=[n+e,n,o].reduce(function(e,t){return Math.abs(t-r)<Math.abs(e-r)?t:e})}if(!1!==n&&l(o))return void c.spring(o).from({pos:C}).to({pos:z}).start();C=z,J(),eP(),O||(O=!0,Y("settle"))}function eP(){let e;if(!x||!M)return;let t=j[A];V=el();let n=new Set,o=[];for(let i of D){if(i.isVirtual&&!H.has(i.index)&&0>V.indexOf(i))continue;let l=eg(i);if(!l)continue;o.push(i);let a=t?.slides?.indexOf(i)>-1;if(a&&n.add(l),!H.has(i.index)){let e=i.pos?Math.round(1e4*i.pos)/1e4:0,t=R?0:T?-1*e:e,n=R?e:0,o=m(t,0,i.dim,0,100),a=m(n,0,i.dim,0,100),r=E.setTransform||void 0;r instanceof Function?r(eO,i,{x:t,y:n,xPercent:o,yPercent:a}):l.style.transform=t||n?`translate3d(${o}%, ${a}%,0)`:"",l.dataset.x=`${t}`}if(B("adaptiveHeight")&&a){let t=(l.firstElementChild||l).getBoundingClientRect().height;e=void 0==e?t:Math.max(e,t)}}[...er(M,`.${E.classes.slide}`)].forEach(e=>{let t=F[parseInt(e.getAttribute("index")||"-1")];t||e.remove(),ec(e,E.classes.isSelected,n.has(e)),t.isVirtual&&!H.has(t.index)&&0>V.indexOf(t)&&ev(t)}),M&&e&&(M.style.height=`${e}px`),Y("render",o)}function eC(){for(let e of(x?.removeEventListener("click",eM),ew(),document.removeEventListener("mousemove",U),d?.disconnect(),d=void 0,F))e.el&&r(e.el)&&(e.state=void 0,eL(e),eS(e),ev(e),e.isVirtual?(e.el?.remove(),e.el=void 0):(e.el.style.transform="",M?.appendChild(e.el)));for(let e of Object.values(w))e?.destroy();for(let e of(w={},i?.destroy(),i=void 0,c?.destroy(),c=void 0,Object.values(E.classes||{})))es(x,e);es(M,"is-draggable")}let eO={add:function(e,t){let n=C,o=A,i=ei(),l=Math.floor(((c?.isRunning()?c.getEndValues().pos:C)-j[0].pos)/i);for(let n of ea(e,t))Y("addSlide",n);return K($),eb(),c&&(o===A&&(n-=l*i),z=j[A||0].pos||0,c.spring({clamp:!0,mass:1,tension:300,friction:25,restDelta:1,restSpeed:1}).from({pos:n}).to({pos:z}).start()),eP(),eO},canGoPrev:function(){return S||A>0},canGoNext:function(){return S||A<j.length-1},destroy:function(){return Y("destroy"),window.removeEventListener("resize",X),eC(),Z.clear(),x=null,j=[],F=[],E={...ep},w={},D=[],v="",$="*",y=ef.Destroyed,eO},emit:Y,filter:function(e="*"){return K(e),eb(),eP(),Y("filter",e),eO},getContainer:function(){return x},getGapDim:en,getGestures:function(){return i},getLastMouseMove:function(){return n},getOption:function(e){return B(e)},getOptions:function(){return E},getPage:function(){return j[A]},getPageIndex:function(e){if(void 0!==e){for(let t of j||[])for(let n of t.slides)if(n.index===e)return t.index;return -1}return A},getPageProgress:function(e,t){void 0===e&&(e=A);let n=j[e];if(!n)return e>A?-1:1;let o=ei(),i=en(),l=n.pos,a=eO.getPosition();if(S&&!0!==t){let e=Math.floor((a-j[0].pos)/o);a-=e*o,l=[l+o,l,l-o].reduce(function(e,t){return Math.abs(t-a)<Math.abs(e-a)?t:e})}return(a-l)/(n.dim+i)},getPageVisibility:function(e){void 0===e&&(e=A);let t=j[e];if(!t)return e>A?-1:1;let n=eO.getPosition(),o=eo(),i=t.pos;if(S){let e=eO.getPosition(),t=ei(),n=i+Math.floor((e-j[0].pos)/t)*t,o=n-t;i=[n+t,n,o].reduce(function(t,n){return Math.abs(n-e)<Math.abs(t-e)?n:t})}return i>n&&i+t.dim<n+o?1:i<n?(i+t.dim-n)/t.dim:i+t.dim>n+o?(n+o-i)/t.dim:0},getPages:function(){return j},getPlugins:function(){return w},getPosition:function(e){let t=C;if(S&&!0!==e){let e=ei();t-=Math.floor((C-j[0]?.pos||0)/e)*e}return t},getSlides:function(){return F},getState:function(){return y},getTotalSlideDim:ei,getTween:function(){return c},getViewport:function(){return M},getViewportDim:eo,getVisibleSlides:function(e){return void 0===e?V:el(e)},goTo:eR,hasNavigated:function(){return void 0!==g},hideError:eS,hideLoading:eL,init:function(){if(!e||!r(e))throw Error("No Element found");return y!==ef.Init&&(eC(),y=ef.Init),x=e,b=t,window.removeEventListener("resize",X),b.breakpoints&&window.addEventListener("resize",X),X(),eO},isInfinite:function(){return S},isInTransition:function(){return H.size>0},isRTL:function(){return T},isSettled:function(){return O},localize:function(e,t=[]){return W(e,t)},next:function(e={}){return eR(A+1,e),eO},off:function(e,t){for(let n of e instanceof Array?e:[e])Z.has(n)&&Z.set(n,Z.get(n).filter(e=>e!==t));return eO},on:function(e,t){for(let n of e instanceof Array?e:[e])Z.set(n,[...Z.get(n)||[],t]);return eO},prev:function(e={}){return eR(A-1,e),eO},remove:function(e){void 0===e&&(e=F.length-1);let t=F[e];return t&&(Y("removeSlide",t),t.el&&(eE(t.el),t.el.remove(),t.el=void 0),F.splice(e,1),K($),eb(),eP()),eO},setPosition:function(e){C=e,J(),eP()},showError:function(e,t){eL(e),eS(e);let n=e.el;if(n){let o=document.createElement("div");h(o,"f-html"),h(o,"is-error"),o.innerHTML=W(t||"<p>{{ERROR}}</p>"),e.htmlEl=o,h(n,"has-html"),h(n,"has-error"),n.insertAdjacentElement("afterbegin",o),Y("contentReady",e)}return eO},showLoading:function(e){let t=e.el,n=t?.querySelector(".f-spinner");if(!t||n)return eO;let o=s(B("spinnerTpl"));return o&&(h(o,"f-spinner"),h(t,"is-loading"),t.insertAdjacentElement("beforeend",o)),eO},version:"6.0.18"};return eO};eh.l10n={en_EN:eu},eh.getDefaults=()=>ep;let ev=function(e="",t="",n=""){return e.split(t).join(n)},ey={tpl:e=>`<img class="f-panzoom__content" 
    ${e.srcset?'data-lazy-srcset="{{srcset}}"':""} 
    ${e.sizes?'data-lazy-sizes="{{sizes}}"':""} 
    data-lazy-src="{{src}}" alt="{{alt}}" />`},eb=()=>{let e;function t(t,n){let o=e?.getOptions().Zoomable,i=(l(o)?{...ey,...o}:ey)[t];return i&&"function"==typeof i&&n?i(n):i}function n(){e&&(e.on("addSlide",r),e.on("removeSlide",s),e.on("attachSlideEl",c),e.on("click",i),e.on("change",o))}function o(){u()}function i(e,t){let n=t.target;n&&!t.defaultPrevented&&n.dataset.panzoomAction&&d(n.dataset.panzoomAction)}function r(n,o){if(!e)return;let i=o.el;if(!i)return;let l=o.src||o.lazySrc||"",r=o.alt||o.caption||`Image #${o.index}`,s=o.srcset||o.lazySrcset||"",c=o.sizes||o.lazySizes||"";if(l&&a(l)&&!o.html&&(!o.type||"image"===o.type)){o.type="image";let e=t("tpl",o);e=ev(e,"{{src}}",l+""),e=ev(e,"{{alt}}",r+""),e=ev(e,"{{srcset}}",s+""),e=ev(e,"{{sizes}}",c+""),i.insertAdjacentHTML("afterbegin",e)}if(!i.querySelector(".f-panzoom__content"))return;let d=ea(i,{width:o.width&&"auto"!==o.width?parseFloat(o.width+""):"auto",height:o.height&&"auto"!==o.height?parseFloat(o.height+""):"auto",classes:{container:"f-zoomable"},event:()=>e?.getLastMouseMove(),spinnerTpl:()=>e?.getOption("spinnerTpl")||"",...t("Panzoom")});d.on("*",(t,n,...i)=>{e&&("loading"===n&&(o.state=0),"loaded"===n&&(o.state=1),"error"===n&&(o.state=2,e?.showError(o,"{{IMAGE_ERROR}}")),e.emit(`panzoom:${n}`,o,...i),"ready"===n&&e.emit("contentReady",o),o.index===e.getPageIndex()&&u())}),o.panzoomRef=d}function s(e,t){t.panzoomRef&&(t.panzoomRef.destroy(),t.panzoomRef=void 0)}function c(e,t){let n=t.panzoomRef;if(n)switch(n.getState()){case et.Init:n.init();break;case et.Ready:n.execute(J.Reset,{velocity:0})}}function u(){let t=e?.getContainer();if(!t)return;let n=e?.getPage()?.slides[0].panzoomRef,o=n?.canZoomIn()||!1,i=n?.canZoomOut()||!1,l=n?.isFullsize()||!1,a=!n||n?.getState()!==et.Ready;for(let e of t?.querySelectorAll("[data-panzoom-action]")||[]){let t=e.dataset.panzoomAction,n=!1;if(a)n=!0;else switch(t){case J.ZoomIn:o||(n=!0);break;case J.ZoomOut:i||(n=!0);break;case J.ToggleFull:o||i||(n=!0);let r=e.querySelector("g");r&&(r.style.display=l?"none":"");break;case J.ToggleCover:case J.ToggleMax:o||i||(n=!0)}n?(e.setAttribute("aria-disabled",""),e.setAttribute("tabindex","-1")):(e.removeAttribute("aria-disabled"),e.removeAttribute("tabindex"))}}function d(t,...n){e?.getPage().slides[0].panzoomRef?.execute(t,...n)}return{init:function(t){!1!==(e=t).getOptions().Zoomable&&e.on("initPlugins",n)},destroy:function(){if(e)for(let t of(e.off("addSlide",r),e.off("removeSlide",s),e.off("attachSlideEl",c),e.off("change",o),e.getSlides()))s(e,t);e=void 0},execute:d}},eE={syncOnChange:!1,syncOnClick:!0,syncOnHover:!1},ew=()=>{let e,t;function n(){let t=e?.getOptions().Sync;return l(t)?{...eE,...t}:eE}function o(){let o=n().target;e&&o&&e&&o&&(t=o,e.getOptions().classes={...e.getOptions().classes,isSelected:""},e.getOptions().initialSlide=t.getPage()?.slides[0]?.index||0,n().syncOnChange&&e.on("change",a),n().syncOnClick&&e.on("click",s),n().syncOnHover&&e.getViewport()?.addEventListener("mouseover",c),e&&t&&(e.on("ready",i),e.on("refresh",u),t.on("change",r),t.on("filter",d)))}function i(){f()}function a(){if(e&&t){let n=e.getPage()?.slides||[],o=t.getPageIndex(n[0].index||0);o>-1&&t.goTo(o,e.hasNavigated()?void 0:{tween:!1,transition:!1}),f()}}function r(){if(e&&t){let n=e.getPageIndex(t.getPage()?.slides[0].index||0);n>-1&&e.goTo(n,t.hasNavigated()?void 0:{tween:!1,transition:!1}),f()}}function s(n,o){if(!e||!t||e.getTween()?.isRunning())return;let i=e?.getOptions().classes.slide;if(!i)return;let l=i?o.target.closest(`.${i}`):null;if(l){let e=parseInt(l.getAttribute("index")||"")||0,n=t.getPageIndex(e);t.goTo(n)}}function c(t){e&&s(e,t)}function u(){if(e&&t){let n=e.getPageIndex(t.getPage()?.slides[0].index||0);n>-1&&e.goTo(n,{tween:!1,transition:!1}),f()}}function d(n,o){e&&t&&(e.filter(o),r())}function f(){if(!t)return;let n=t.getPage()?.slides[0]?.index||0;for(let t of e?.getSlides()||[])t.el?.classList.toggle("is-selected",t.index===n)}return{init:function(t){(e=t).on("initSlides",o)},destroy:function(){e?.off("ready",i),e?.off("refresh",u),e?.off("change",a),e?.off("click",s),e?.getViewport()?.removeEventListener("mouseover",c),t?.off("change",r),t?.off("filter",d),t=void 0,e?.off("initSlides",o),e=void 0},getTarget:function(){return t}}},ex={showLoading:!0,preload:1},eM="is-lazyloading",eL="is-lazyloaded",eS=()=>{let e;function t(){let t=e?.getOptions().Lazyload;return l(t)?{...ex,...t}:ex}function n(){if(!e)return;let n=t().preload,o=[...e.getVisibleSlides()],i=e.getPosition(),l=e.getViewportDim();for(let a of(o.push(...e.getVisibleSlides(i+l*n),...e.getVisibleSlides(i-l*n)),o||[]))!function(n){let o=n.el;if(!o)return;let i="[data-lazy-src],[data-lazy-srcset],[data-lazy-bg]",l=Array.from(o.querySelectorAll(i));for(let a of(o.matches(i)&&l.push(o),l)){let o=a.dataset.lazySrc,i=a.dataset.lazySrcset,l=a.dataset.lazySizes,r=a.dataset.lazyBg,s=(a instanceof HTMLImageElement||a instanceof HTMLSourceElement)&&(o||i),c=a instanceof HTMLElement&&r;if(!(s||c))continue;let u=o||i||r;u&&(s&&u?(t().showLoading&&e?.showLoading(n),a.addEventListener("load",()=>{e?.hideLoading(n),a instanceof HTMLImageElement?a.decode().then(()=>{a.classList.remove(eM),a.classList.add(eL)}):(a.classList.remove(eM),a.classList.add(eL)),e?.emit("lazyLoad:loaded",n,a,u)}),a.addEventListener("error",()=>{e?.hideLoading(n),a.classList.remove(eM),a.classList.add("has-lazyerror"),e?.emit("lazyLoad:error",n,a,u)}),a.classList.add("f-lazyload"),a.classList.add(eM),e?.emit("lazyLoad:load",n,a,u),o&&(a.src=o),i&&(a.srcset=i),l&&(a.sizes=l)):c&&(document.body.contains(a)||(document.createElement("img").src=r),a.style.backgroundImage=`url('${r}')`),delete a.dataset.lazySrc,delete a.dataset.lazySrcset,delete a.dataset.lazySizes,delete a.dataset.lazyBg)}}(a)}return{init:function(t){(e=t).on("render",n)},destroy:function(){e?.off("render",n),e=void 0}}},eT={prevTpl:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"></path></svg>',nextTpl:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"></path></svg>'},eR=()=>{let e,t,n;function o(t){if(!e)return;let n=`<button data-carousel-go-${t} tabindex="0" class="f-button is-arrow is-${t}" title="{{${t.toUpperCase()}}}">`+function(){let t=e?.getOptions().Arrows;return l(t)?{...eT,...t}:eT}()[`${t}Tpl`]+"</button";return s(e.localize(n))||void 0}function i(){t?.remove(),t=void 0,n?.remove(),n=void 0,e?.getContainer()?.classList.remove("has-arrows")}function a(){e&&!1!==e.getOptions().Arrows&&e.getPages().length>1?(!function(){if(!e)return;let i=e.getViewport();i&&(!t&&(t=o("prev"))&&i.insertAdjacentElement("beforebegin",t),!n&&(n=o("next"))&&i.insertAdjacentElement("afterend",n),ec(e.getContainer(),"has-arrows",!!(t||n)))}(),e&&(t?.toggleAttribute("aria-disabled",!e.canGoPrev()),n?.toggleAttribute("aria-disabled",!e.canGoNext()))):i()}return{init:function(t){e=t.on(["change","refresh"],a)},destroy:function(){i(),e?.off(["change","refresh"],a),e=void 0}}},eP={moveLeft:{tpl:'<button data-panzoom-action="moveLeft" class="f-button" title="{{MOVE_LEFT}}"><svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg></button>'},moveRight:{tpl:'<button data-panzoom-action="moveRight" class="f-button" title="{{MOVE_RIGHT}}"><svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg></button>'},moveUp:{tpl:'<button data-panzoom-action="moveUp" class="f-button" title="{{MOVE_UP}}"><svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg></button>'},moveDown:{tpl:'<button data-panzoom-action="moveDown" class="f-button" title="{{MOVE_DOWN}}"><svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg></button>'},zoomIn:{tpl:'<button data-panzoom-action="zoomIn" class="f-button" title="{{ZOOM_IN}}"><svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg></button>'},zoomOut:{tpl:'<button data-panzoom-action="zoomOut" class="f-button" title="{{ZOOM_OUT}}"><svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg></button>'},toggle1to1:{tpl:'<button data-panzoom-action="toggleFull" class="f-button" title="{{TOGGLE_FULL}}"><svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg></button>'},toggleFull:{tpl:'<button data-panzoom-action="toggleFull" class="f-button" title="{{TOGGLE_FULL}}"><svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg></button>'},rotateCCW:{tpl:'<button data-panzoom-action="rotateCCW" class="f-button" title="{{ROTATE_CCW}}"><svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg></button>'},rotateCW:{tpl:'<button data-panzoom-action="rotateCW" class="f-button" title="{{ROTATE_CW}}"><svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg></button>'},flipX:{tpl:'<button data-panzoom-action="flipX" class="f-button" title="{{FLIP_X}}"><svg><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg></button>'},flipY:{tpl:'<button data-panzoom-action="flipY" class="f-button" title="{{FLIP_Y}}"><svg><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg></button>'},reset:{tpl:'<button data-panzoom-action="reset" class="f-button" title="{{RESET}}"><svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg></button>'}},eC=((O={}).Left="left",O.middle="middle",O.right="right",O),eO={counter:{tpl:'<div class="f-carousel__counter"><span data-carousel-page></span>/<span data-carousel-pages></span></div>'},download:{tpl:'<button data-carousel-download class="f-button" title="{{DOWNLOAD}}"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></button>'},autoplay:{tpl:'<button data-autoplay-action="toggle" class="f-button" title="{{TOGGLE_AUTOPLAY}}"><svg><g><path d="M5 3.5 19 12 5 20.5Z"/></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>'},thumbs:{tpl:'<button data-thumbs-action="toggle" class="f-button" title="{{TOGGLE_THUMBS}}"><svg><rect width="18" height="14" x="3" y="3" rx="2"/><path d="M4 21h1M9 21h1M14 21h1M19 21h1"/></svg></button>'},...eP},eA={absolute:!1,display:{left:[],middle:["zoomIn","zoomOut","toggle1to1","rotateCCW","rotateCW","flipX","flipY","reset"],right:[]},enabled:"auto",items:{}},ez=()=>{let e,t;function n(){let t=e?.getOptions().Toolbar;return l(t)?{...eA,...t}:eA}function o(){if(!e?.getOptions().Toolbar||!e||t)return;let o=n().enabled;if(!o)return;let i=n().absolute,l=e.getSlides().length>1,r=!1,c=!1;for(let t of e.getSlides())t.panzoomRef&&(r=!0),(t.downloadSrc||"image"===t.type&&t.src)&&(c=!0);let u=e.getPlugins().Thumbs?.isEnabled()||!1,d=l&&e.getPlugins().Autoplay||!1,g=e.getPlugins().Fullscreen&&(document.fullscreenEnabled||document.webkitFullscreenEnabled);if("auto"===o&&(o=r),!o)return;(t=document.createElement("div")).classList.add("f-carousel__toolbar");let p=n().display,m=f({},eO,n().items);for(let n of["left","middle","right"]){let o=p[n]||[],i=document.createElement("div");for(let t of(i.classList.add("f-carousel__toolbar__column"),i.classList.add(`is-${n}`),o)){let n;if(a(t)){if("counter"===t&&!l||"autoplay"===t&&!d||eP[t]&&!r||"fullscreen"===t&&!g||"thumbs"===t&&!u||"download"===t&&!c)continue;n=m[t]}if("object"==typeof t&&(n=t),n&&n.tpl){let t=e.localize(n.tpl),o=s(t=t.split("<svg>").join('<svg tabindex="-1" width="24" height="24" viewBox="0 0 24 24">'));o&&("function"==typeof n.click&&e&&o.addEventListener("click",t=>{t.preventDefault(),t.stopPropagation(),"function"==typeof n.click&&e&&n.click(e,t)}),i.append(o))}}t.append(i)}t.childElementCount&&(!0===i&&t.classList.add("is-absolute"),e.getContainer()?.classList.add("has-toolbar"),e.getViewport()?.insertAdjacentElement("beforebegin",t))}return{init:function(t){(e=t).on("initSlides",o)},destroy:function(){e?.off("initSlides",o),e?.getContainer()?.classList.remove("has-toolbar"),t?.remove(),t=void 0},add:function(e,t){eO[e]=t},isEnabled:function(){return!!t}}},ek={autoStart:!0,pauseOnHover:!0,showProgressbar:!0,timeout:2e3},eI=()=>{let e,t,n=!1,o=!1,i=!1,a=null;function r(t){let n=e?.getOptions().Autoplay,o=(l(n)?{...ek,...n}:ek)[t];return o&&"function"==typeof o&&e?o(e):o}function s(){for(let t of e?.getPage()?.slides||[])if(0===t.state)return!0;return!1}function c(){clearTimeout(t),t=void 0}function u(){!(t||i||s())&&e?.isSettled()&&(function(){if(!e||(g(),!r("showProgressbar")))return;let t=r("progressbarParentEl");if(!t&&e.getPlugins().Toolbar?.isEnabled()&&(t=e.getContainer()),!t&&e.getPlugins().Toolbar?.isEnabled()!==!0){let n=e.getPages()[0]?.slides||[],o=e.getPage()?.slides||[];1===n.length&&1===o.length&&(t=o[0].el)}if(t||(t=e.getViewport()),!t)return;(a=document.createElement("div")).classList.add("f-progressbar"),t.prepend(a);let n=r("timeout")||1e3;a.style.animationDuration=`${n}ms`}(),t=setTimeout(()=>{if(e&&n&&!o){if(!e.isInfinite()&&e.getPageIndex()===e.getPages().length-1)return void e.goTo(0);e.next()}},r("timeout")))}function d(){if(!e||e.getPages().length<2||!1===e.getOptions().Autoplay||n)return;n=!0,e.emit("autoplay:start",r("timeout")),e.getContainer()?.classList.add("has-autoplay"),e.getTween()?.on("start",b);let t=e?.getContainer();t&&r("pauseOnHover")&&matchMedia("(hover: hover)").matches&&(t.addEventListener("mouseenter",E,!1),t.addEventListener("mouseleave",w,!1)),e.on("change",v),e.on("settle",y),e.on("contentReady",m),e.on("panzoom:animationStart",f),e.isSettled()&&u()}function f(){if(c(),g(),n&&e){e.emit("autoplay:end"),e.getContainer()?.classList.remove("has-autoplay"),e.getTween()?.off("start",b);let t=e?.getContainer();t&&(t.removeEventListener("mouseenter",E,!1),t.removeEventListener("mouseleave",w,!1))}e&&(e.off("change",v),e.off("settle",y),e.off("contentReady",m),e.off("panzoom:animationStart",f)),n=!1,o=!1}function g(){a&&(a.remove(),a=null)}function p(){e&&e.getPages().length>1&&r("autoStart")&&d()}function m(t){e&&e.getPageIndex(t.index)===e.getPageIndex()&&(!n||i||s()||u())}function h(e,t){let n=t.target;n&&!t.defaultPrevented&&"toggle"===n.dataset.autoplayAction&&x.toggle()}function v(){e&&(e?.isInfinite()||e.getPageIndex()!==e.getPages().length-1)?(g(),c()):f()}function y(){!n||i||o||u()}function b(){c(),g()}function E(){i=!0,n&&(g(),c())}function w(){i=!1,n&&!o&&e?.isSettled()&&u()}let x={init:function(t){(e=t).on("ready",p),e.on("click",h)},destroy:function(){f(),e?.off("ready",p),e?.off("click",h),e=void 0},isEnabled:()=>n,pause:function(){o=!0,c()},resume:function(){o=!1,n&&!i&&u()},start(){d()},stop(){f()},toggle(){n?f():d()}};return x},e$={Carousel:{Lazyload:{showLoading:!1}},minCount:2,showOnStart:!0,thumbTpl:'<button aria-label="Slide to #{{page}}"><img draggable="false" alt="{{alt}}" data-lazy-src="{{src}}" /></button>',type:"modern"},eF=()=>{let e,t,n,i=0,a=0,r=!0;function s(t){let n=e?.getOptions().Thumbs,o=(l(n)?{...e$,...n}:e$)[t];return o&&"function"==typeof o?o():o}function c(){if(!e||e?.getOptions().Thumbs===!1)return!1;let t=0;for(let n of e.getSlides())n.thumbSrc&&t++;return t>=s("minCount")}function u(){return"modern"===s("type")}function d(t=!1){let o=e?.getContainer();if(e&&o&&!n&&c()){if(!n){let e=o.nextElementSibling;e?.classList.contains("f-thumbs")&&(n=e)}if(!n){(n=document.createElement("div")).classList.add("f-thumbs");let e=s("parentEl");e?e.insertAdjacentElement("beforeend",n):o.insertAdjacentElement("afterend",n)}n.classList.add(`is-${s("type")}`),n.classList.add("is-syncing"),t&&(n.style.maxHeight="0px")}}function g(e){let t=e.thumb?e.thumb instanceof HTMLImageElement?e.thumb.src:e.thumb:e.thumbSrc||void 0,n=s("thumbTpl");return n=ev(n,"{{alt}}",`Thumbnail #${e.index}`),n=ev(n,"{{src}}",t+""),n=ev(n,"{{index}}",`${e.index}`),{html:n=ev(n,"{{page}}",`${e.index||1}`),class:e.thumbClass}}function m(){if(!o||!e||!n||t)return;let l=[];for(let t of e.getSlides())l.push(g(t));l.length&&(t=o(n,f({},{Sync:{target:e},Lazyload:{preload:1},slides:l,classes:{container:"f-thumbs",viewport:"f-thumbs__viewport",slide:"f-thumbs__slide"},initialSlide:e.getOptions().initialPage,center:!0,fill:!u(),infinite:!1,dragFree:!0,rtl:e.getOptions().rtl||!1,slidesPerPage:e=>{let t=0;return(u()&&(function(){if(!u()||!n)return;let e=e=>n&&parseFloat(getComputedStyle(n).getPropertyValue("--f-thumb-"+e))||0;i=e("width"),a=e("clip-width")}(),t=(i-a)*4),e&&e.getTotalSlideDim()<=e.getViewportDim()-t)?1/0:1}},e$.Carousel||{},s("Carousel")||{}),{Sync:ew,Lazyload:eS}).init(),t.getGestures()?.on("start",()=>{r=!1}),t.on("click",(e,t)=>{let n=t.target;if(n){let e=n.matches("button")?n:n.firstElementChild;e&&e.matches("button")&&(t.preventDefault(),e.focus({}))}}),e.getContainer()?.classList.add("has-thumbs"),x())}function h(){c()&&(s("showOnStart")&&(d(),m()),e?.getGestures()?.on("start",v),e?.on("addSlide",E),e?.on("click",w))}function v(){r=!0,document.activeElement?.closest(".f-thumbs")&&document.activeElement?.blur()}function y(){n?.classList.toggle("is-syncing",e?.hasNavigated()===!1||e?.getTween()?.isRunning()),x(),e?.getGestures()?.isPointerDown()&&function(){if(!u()||!e||!t||!r)return;let n=t.getTween(),o=t.getPages(),l=e.getPageIndex()||0,s=e.getPageProgress()||0;if(!e||!o||!o[l]||!n)return;let c=n.isRunning()?n.getCurrentValues().pos:t.getPosition();if(void 0===c)return;let d=o[l].pos+s*(i-a);d=p(o[0].pos,d,o[o.length-1].pos),n.from({pos:c}).to({pos:d}).start()}()}function b(){r=!0}function E(e,n){t?.add(g(n),n.index)}function w(e,t){let o=t.target;o&&!t.defaultPrevented&&"toggle"===o.dataset.thumbsAction&&(n||(d(!0),m()),n&&(n.style.maxHeight?n.style.maxHeight="":n.style.maxHeight="0px"))}function x(){if(!u()||!e||!t)return;let n=t?.getSlides()||[],o=-.5*i;for(let t of n){let n=t.el;if(!n)continue;let l=e.getPageProgress(t.index)||0;(l=Math.max(-1,Math.min(1,l)))>-1&&l<1&&(o+=.5*i*(1-Math.abs(l))),l=Math.round(1e4*l)/1e4,o=Math.round(1e4*o)/1e4,n.style.setProperty("--progress",`${Math.abs(l)}`),n.style.setProperty("--shift",`${e?.isRTL()?-1*o:o}px`),l>-1&&l<1&&(o+=.5*i*(1-Math.abs(l)))}}return{init:function(t,n){o=n,(e=t).on("ready",h),e.on("render",y),e.on("change",b)},destroy:function(){e?.off("ready",h),e?.off("render",y),e?.off("change",b),e?.off("addSlide",E),e?.off("click",w),e?.getGestures()?.off("start",v),e?.getContainer()?.classList.remove("has-thumbs"),e=void 0,t?.destroy(),t=void 0,n?.remove(),n=void 0},getContainer:function(){return n},isEnabled:function(){return c()}}},e_={iframeAttr:{allow:"autoplay; fullscreen",scrolling:"auto"}},eD=()=>{let e;function t(e,t){let n=t.src;if(!a(n))return;let o=t.type;if(!o){if(!o&&("#"===n.charAt(0)?o="inline":n.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.((a)?png|avif|gif|jp(g|eg)|pjp(eg)?|jfif|svg|webp|bmp|ico|tif(f)?)((\?|#).*)?$)/i)?o="image":n.match(/\.(pdf)((\?|#).*)?$/i)?o="pdf":n.match(/\.(html|php)((\?|#).*)?$/i)&&(o="iframe")),!o){let e=n.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i);e&&(n=`https://maps.google.${e[1]}/?ll=${(e[2]?e[2]+"&z="+Math.floor(parseFloat(e[3]))+(e[4]?e[4].replace(/^\//,"&"):""):e[4]+"").replace(/\?/,"&")}&output=${e[4]&&e[4].indexOf("layer=c")>0?"svembed":"embed"}`,o="gmap")}if(!o){let e=n.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i);e&&(n=`https://maps.google.${e[1]}/maps?q=${e[2].replace("query=","q=").replace("api=1","")}&output=embed`,o="gmap")}t.src=n,t.type=o}}function n(t,n){("iframe"===n.type||"pdf"===n.type||"gmap"===n.type)&&function(t){if(!e||!t.el||!t.src)return;let n=document.createElement("iframe");for(let[t,o]of(n.classList.add("f-iframe"),Object.entries(function(){let t=e?.getOptions().Html;return l(t)?{...e_,...t}:e_}().iframeAttr||{})))n.setAttribute(t,o);n.onerror=()=>{e&&1===e.getState()&&e.showError(t,"{{IFRAME_ERROR}}")},n.src=t.src;let o=document.createElement("div");if(o.classList.add("f-html"),o.append(n),t.width){let e=`${t.width}`;e.match(/^\d+$/)&&(e+="px"),o.style.maxWidth=`${e}`}if(t.height){let e=`${t.height}`;e.match(/^\d+$/)&&(e+="px"),o.style.maxHeight=`${e}`}if(t.aspectRatio){let e=t.el.getBoundingClientRect();o.style.aspectRatio=`${t.aspectRatio}`,o.style[e.width>e.height?"width":"height"]="auto",o.style[e.width>e.height?"maxWidth":"maxHeight"]="none"}t.contentEl=n,t.htmlEl=o,t.el.classList.add("has-html"),t.el.classList.add("has-iframe"),t.el.classList.add(`has-${t.type}`),t.el.prepend(o),e.emit("contentReady",t)}(n)}function o(t,n){("iframe"===n.type||"pdf"===n.type||"gmap"===n.type)&&(e?.hideError(n),n.contentEl?.remove(),n.contentEl=void 0,n.htmlEl?.remove(),n.htmlEl=void 0)}return{init:function(i){(e=i).on("addSlide",t),e.on("attachSlideEl",n),e.on("detachSlideEl",o)},destroy:function(){e?.off("addSlide",t),e?.off("attachSlideEl",n),e?.off("detachSlideEl",o),e=void 0}}},eH=(e,t={})=>{let n=new URLSearchParams(new URL(e).search),o=new URLSearchParams;for(let[e,i]of[...n,...Object.entries(t)]){let t=i+"";if("t"===e){let e=t.match(/((\d*)m)?(\d*)s?/);e&&o.set("start",60*parseInt(e[2]||"0")+parseInt(e[3]||"0")+"")}else o.set(e,t)}let i=o+"",l=e.match(/#t=((.*)?\d+s)/);return l&&(i+=`#t=${l[1]}`),i},eV={autoplay:!1,html5videoTpl:`<video class="f-html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">
    <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn't support embedded videos.</video>`,iframeAttr:{allow:"autoplay; fullscreen",scrolling:"auto",credentialless:""},vimeo:{byline:1,color:"00adef",controls:1,dnt:1,muted:0},youtube:{controls:1,enablejsapi:1,nocookie:1,rel:0,fs:1}},ej=()=>{let e,t=!1;function n(){let t=e?.getOptions().Video;return l(t)?{...eV,...t}:eV}function o(){return e?.getPage()?.slides[0]}let i=t=>{try{let n=JSON.parse(t.data);if("https://player.vimeo.com"===t.origin){if("ready"===n.event)for(let n of Array.from(e?.getContainer()?.getElementsByClassName("f-iframe")||[]))n instanceof HTMLIFrameElement&&n.contentWindow===t.source&&(n.dataset.ready="true")}else if(t.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/)&&"onReady"===n.event){let e=document.getElementById(n.id);e&&(e.dataset.ready="true")}}catch(e){}};function r(e,t){let o=t.src;if(!a(o))return;let i=t.type;if(!i||"html5video"===i){let e=o.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i);e&&(i="html5video",t.html5videoFormat=t.html5videoFormat||"video/"+("ogv"===e[1]?"ogg":e[1]))}if(!i||"youtube"===i){let e=o.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i);if(e){let l={...n().youtube,...t.youtube||{}},a=`www.youtube${l.nocookie?"-nocookie":""}.com`,r=eH(o,l),s=encodeURIComponent(e[2]);t.videoId=s,t.src=`https://${a}/embed/${s}?${r}`,t.thumb=t.thumb||`https://i.ytimg.com/vi/${s}/mqdefault.jpg`,i="youtube"}}if(!i||"vimeo"===i){let e=o.match(/^.+vimeo.com\/(?:\/)?(video\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/);if(e){let l=eH(o,{...n().vimeo,...t.vimeo||{}}),a=encodeURIComponent(e[2]),r=e[5]||"";t.videoId=a,t.src=`https://player.vimeo.com/video/${a}?${r?`h=${r}${l?"&":""}`:""}${l}`,i="vimeo"}}t.type=i}function c(t,o){"html5video"===o.type&&function(t){if(!e||!t.el||!t.src)return;let{el:o,src:i}=t;if(!o||!i)return;let l=t.html5videoTpl||n().html5videoTpl,r=t.html5videoFormat||n().html5videoFormat;if(!l)return;let c=t.poster||(t.thumb&&a(t.thumb)?t.thumb:""),u=s(l.replace(/\{\{src\}\}/gi,i+"").replace(/\{\{format\}\}/gi,r||"").replace(/\{\{poster\}\}/gi,c+""));if(!u)return;let d=document.createElement("div");d.classList.add("f-html"),d.append(u),t.contentEl=u,t.htmlEl=d,o.classList.add(`has-${t.type}`),o.prepend(d),g(t),e.emit("contentReady",t)}(o),("youtube"===o.type||"vimeo"===o.type)&&function(t){if(!e||!t.el||!t.src)return;let o=document.createElement("iframe");for(let[e,i]of(o.classList.add("f-iframe"),o.setAttribute("id",`f-iframe_${t.videoId}`),Object.entries(n().iframeAttr||{})))o.setAttribute(e,i);o.onload=()=>{e&&1===e.getState()&&"youtube"===t.type&&o.contentWindow?.postMessage(JSON.stringify({event:"listening",id:o.getAttribute("id")}),"*")},o.onerror=()=>{e&&1===e.getState()&&e?.showError(t,"{{IFRAME_ERROR}}")},o.src=t.src;let i=document.createElement("div");i.classList.add("f-html"),i.append(o),t.contentEl=o,t.htmlEl=i,t.el.classList.add("has-html"),t.el.classList.add("has-iframe"),t.el.classList.add(`has-${t.type}`),t.el.prepend(i),g(t),e.emit("contentReady",t)}(o)}function u(e,t){("html5video"===t.type||"youtube"===t.type||"vimeo"===t.type)&&(t.contentEl?.remove(),t.contentEl=void 0,t.htmlEl?.remove(),t.htmlEl=void 0),t.poller&&clearTimeout(t.poller)}function d(){t=!1}function f(){if(t)return;t=!0;let e=o();(e&&void 0!==e.autoplay?e.autoplay:n().autoplay)&&(!function(){let e=o(),t=e?.el;if(t&&e?.type==="html5video")try{let e=t.querySelector("video");if(e){let t=e.play();void 0!==t&&t.then(()=>{}).catch(t=>{e.muted=!0,e.play()})}}catch(e){}let n=e?.htmlEl;n instanceof HTMLIFrameElement&&n.contentWindow?.postMessage('{"event":"command","func":"stopVideo","args":""}',"*")}(),function(){let e=o(),t=e?.type;if(!(e?.el&&("youtube"===t||"vimeo"===t)))return;let n=()=>{if(e.contentEl&&e.contentEl instanceof HTMLIFrameElement&&e.contentEl.contentWindow){let t;if("true"===e.contentEl.dataset.ready){(t="youtube"===e.type?{event:"command",func:"playVideo"}:{method:"play",value:"true"})&&e.contentEl.contentWindow.postMessage(JSON.stringify(t),"*"),e.poller=void 0;return}"youtube"===e.type&&(t={event:"listening",id:e.contentEl.getAttribute("id")},e.contentEl.contentWindow.postMessage(JSON.stringify(t),"*"))}e.poller=setTimeout(n,250)};n()}())}function g(e){let t=e?.htmlEl;if(e&&t&&("html5video"===e.type||"youtube"===e.type||"vimeo"===e.type)){if(t.style.aspectRatio="",t.style.width="",t.style.height="",t.style.maxWidth="",t.style.maxHeight="",e.width){let n=`${e.width}`;n.match(/^\d+$/)&&(n+="px"),t.style.maxWidth=`${n}`}if(e.height){let n=`${e.height}`;n.match(/^\d+$/)&&(n+="px"),t.style.maxHeight=`${n}`}if(e.aspectRatio){let n=e.aspectRatio.split("/"),o=parseFloat(n[0].trim()),i=n[1]?parseFloat(n[1].trim()):0;t.offsetHeight;let l=t.getBoundingClientRect(),a=(o&&i?o/i:o)<(l.width||1)/(l.height||1);t.style.aspectRatio=`${e.aspectRatio}`,t.style.width=a?"auto":"",t.style.height=a?"":"auto"}}}function p(){g(o())}return{init:function(t){(e=t).on("addSlide",r),e.on("attachSlideEl",c),e.on("detachSlideEl",u),e.on("ready",f),e.on("change",d),e.on("settle",f),e.on("refresh",p),window.addEventListener("message",i)},destroy:function(){e?.off("addSlide",r),e?.off("attachSlideEl",c),e?.off("detachSlideEl",u),e?.off("ready",f),e?.off("change",d),e?.off("settle",f),e?.off("refresh",p),window.removeEventListener("message",i),e=void 0}}},eN={autoStart:!1,btnTpl:'<button data-fullscreen-action="toggle" class="f-button" title="{{TOGGLE_FULLSCREEN}}"><svg><g><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>'},eq="in-fullscreen-mode",eB=()=>{let e;function t(t){let n=e?.getOptions().Fullscreen,o=(l(n)?{...eN,...n}:eN)[t];return o&&"function"==typeof o&&e?o(e):o}function n(){e?.getPlugins().Toolbar?.add("fullscreen",{tpl:t("btnTpl")})}function o(){if(t("autoStart")){let e=r();e&&c(e)}}function i(e,t){let n=t.target;n&&!t.defaultPrevented&&"toggle"===n.dataset.fullscreenAction&&d()}function a(e){r()&&"Escape"===e.key&&!e.defaultPrevented&&d()}function r(){return t("el")||e?.getContainer()||void 0}function s(){let e=document;return e.fullscreenEnabled?!!e.fullscreenElement:!!e.webkitFullscreenEnabled&&!!e.webkitFullscreenElement}function c(e){let t,n=document;return e||(e=n.documentElement),n.fullscreenEnabled?t=e.requestFullscreen():n.webkitFullscreenEnabled&&(t=e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)),t&&t.then(()=>{e.classList.add(eq)}),t}function u(){let e,t=document;return t.fullscreenEnabled?e=t.fullscreenElement&&t.exitFullscreen():t.webkitFullscreenEnabled&&(e=t.webkitFullscreenElement&&t.webkitExitFullscreen()),e&&e.then(()=>{r()?.classList.remove(eq)}),e}function d(){let e=r();e&&(s()?u():c(e))}return{init:function(t){(e=t).on("initPlugins",n),e.on("ready",o),e.on("click",i)},destroy:function(){e?.off("initPlugins",n),e?.off("ready",o),e?.off("click",i),document.removeEventListener("keydown",a,!0)},exit:u,inFullscreen:s,request:c,toggle:d}},eW=!1,eZ=!1,eG=!1,eY=!1,eX=()=>{let e=new URL(document.URL).hash,t=e.slice(1).split("-"),n=t[t.length-1],o=n&&/^\+?\d+$/.test(n)&&parseInt(t.pop()||"1",10)||1;return{hash:e,slug:t.join("-"),index:o}},eU=()=>{if(!i||i.getInstance())return;let{slug:e,index:t}=eX();if(!e)return;let n=document.querySelector(`[data-slug="${e}"]`);if(n&&n.dispatchEvent(new CustomEvent("click",{bubbles:!0,cancelable:!0})),!i||i.getInstance())return;let o=document.querySelectorAll(`[data-fancybox="${e}"]`);o.length&&(n=o[t-1])&&n.dispatchEvent(new CustomEvent("click",{bubbles:!0,cancelable:!0}))},eK=()=>{if(!i||eG)return;let e=i?.getInstance();if(e?.getOptions().Hash===!1)return;let{slug:t,index:n}=eX(),o=e?.getSlide()?.fancybox||e?.getSlide()?.slug||void 0;e&&o&&(t===o?e.getCarousel()?.goTo(n-1):(eY=!0,e.close(),eY=!1)),eU()},eJ=()=>{i&&setTimeout(()=>{eW=!0,eU(),eW=!1,window.addEventListener("hashchange",eK,!1)},300)},eQ=()=>{let e,t="auto",n="";function o(){if(!e||!e.isTopMost()||!1===e.getOptions().Hash)return;let o=e.getCarousel();if(!o)return;let{hash:l,slug:a}=eX(),r=e.getSlide();if(!r)return;let s=r.fancybox||"",c=parseInt(r.index+"",10)+1;if(!s)return;let u=`#${s}-${c}`;if(l!==u&&(n=l),history.scrollRestoration&&(t=history.scrollRestoration,history.scrollRestoration="manual"),o.on("change",i),!eW)if(s===a)try{window.history.replaceState({},document.title,window.location.pathname+window.location.search+u)}catch(e){}else try{window.history.pushState({},document.title,window.location.pathname+window.location.search+u),eZ=!0}catch(e){}}function i(){if(!e||!e.isTopMost()||!1===e.getOptions().Hash)return;let{slug:t}=eX(),n=e.getSlide();if(!n)return;let o=n.fancybox||"",i=n.index+1,l=`#${o}-${i}`;if(o===t){eG=!0;try{window.history.replaceState({},document.title,window.location.pathname+window.location.search+l)}catch(e){}eG=!1}}function l(){if(eY||!e||!e.isTopMost()||!1===e.getOptions().Hash)return;let t=e.getSlide();if(t&&t.fancybox){eG=!0;try{eZ&&!eW&&!function(){if(window.parent===window)return!1;try{var e=window.frameElement}catch(t){e=null}return null===e?"data:"===location.protocol:e.hasAttribute("sandbox")}()?window.history.back():window.history.replaceState({},document.title,window.location.pathname+window.location.search+n)}catch(e){}eG=!1}}return{init:function(t){(e=t).on("ready",o),e.on("close",l)},destroy:function(){e?.off("ready",o),e?.off("close",l);let n=e?.getCarousel();n&&n.off("change",i),e=void 0,history.scrollRestoration&&t&&(history.scrollRestoration=t)}}};eQ.startFromUrl=eU,eQ.setup=function(e){!i&&(i=e,g()&&(/complete|interactive|loaded/.test(document.readyState)?eJ():document.addEventListener("DOMContentLoaded",eJ)))};let e0={...eu,CLOSE:"Close",NEXT:"Next",PREV:"Previous",MODAL:"You can close this modal content with the ESC key",ELEMENT_NOT_FOUND:"HTML Element Not Found",IFRAME_ERROR:"Error Loading Page"},e1='<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="M19.286 4.714 4.714 19.286M4.714 4.714l14.572 14.572" /></svg></button>';ez().add("close",{tpl:e1});let e2=e=>{e&&e.dispatchEvent(new CustomEvent("animationend",{bubbles:!1,cancelable:!0,currentTarget:e}))},e5=(e=null,t="",n)=>{if(!e||!e.parentElement||!t){n&&n();return}e2(e);let o=i=>{i.target===e&&e.dataset.animationName&&(e.removeEventListener("animationend",o),delete e.dataset.animationName,n&&n(),e.classList.remove(t))};e.dataset.animationName=t,e.addEventListener("animationend",o),h(e,t)},e4=((A={})[A.Init=0]="Init",A[A.Ready=1]="Ready",A[A.Closing=2]="Closing",A[A.Destroyed=3]="Destroyed",A),e3={ajax:null,backdropClick:"close",Carousel:{},closeButton:"auto",closeExisting:!1,delegateEl:void 0,dragToClose:!0,fadeEffect:!0,groupAll:!1,groupAttr:"data-fancybox",hideClass:"f-fadeOut",hideScrollbar:!0,id:void 0,idle:!1,keyboard:{Escape:"close",Delete:"close",Backspace:"close",PageUp:"next",PageDown:"prev",ArrowUp:"prev",ArrowDown:"next",ArrowRight:"next",ArrowLeft:"prev"},l10n:e0,mainClass:"",mainStyle:{},mainTpl:`<dialog class="fancybox__dialog">
    <div class="fancybox__container" tabindex="0" aria-label="{{MODAL}}">
      <div class="fancybox__backdrop"></div>
      <div class="fancybox__carousel"></div>
    </div>
  </dialog>`,on:{},parentEl:void 0,placeFocusBack:!0,showClass:"f-zoomInUp",startIndex:0,sync:void 0,theme:"dark",triggerEl:void 0,triggerEvent:void 0,zoomEffect:!0},e6=new Map,e8=0,e7="with-fancybox",e9={Plugins:{Hash:eQ},version:"6.0.18",openers:new Map,bind:function(e,t,n){if(!g())return;let o=document.body,i="[data-fancybox]",l={};if(a(e)?(o=document.body,i=e,"object"==typeof t&&(l=t||{})):e instanceof Element&&(o=e,a(t)&&(i=t),"object"==typeof n&&(l=n||{})),!(o&&o instanceof Element)||!i)return!1;let r=e9.openers.get(o)||new Map;if(r.set(i,l),e9.openers.set(o,r),1===r.size)for(let e of(o.addEventListener("click",e9.fromEvent),Object.values(e9.Plugins))){let t=e.setup;"function"==typeof t&&t(e9)}return!0},close:function(e=!0,...t){if(e)for(let e of e6.values())e.close(...t);else{let e=e9.getInstance();e&&e.close(...t)}},destroy:function(){let e;for(;e=e9.getInstance();)e.destroy();for(let e of e9.openers.keys())e.removeEventListener("click",e9.fromEvent);e9.openers.clear()},fromEvent:function(e){let t,n;if(e.defaultPrevented||e.button&&0!==e.button||e.ctrlKey||e.metaKey||e.shiftKey)return;let o=e.composedPath()[0];if(o.closest(".fancybox__container.is-hiding")){e.preventDefault(),e.stopPropagation();return}let i=o.closest("[data-fancybox-delegate]")||void 0;if(i){let e=i.dataset.fancyboxDelegate||"",t=document.querySelectorAll(`[data-fancybox="${e}"]`);o=t[parseInt(i.dataset.fancyboxIndex||"",10)||0]||t[0]}if(!(o&&o instanceof Element))return;let l={};for(let[e,i]of e9.openers)if(i&&e.contains(o))for(let[a,r]of i){let i=null;try{i=o.closest(a)}catch(e){}i&&(o=i,t=e,n=a,f(l,r||{}))}if(!t||!n)return;e.preventDefault();let a=f({},e3,{triggerEvent:e,triggerEl:o,delegateEl:i},l),r=a.groupAll,s=a.groupAttr,c=s&&o?o.getAttribute(`${s}`):"",u=[],d=o.closest(".f-carousel")?.carousel;if(d){let e=[];for(let t of d?.getSlides()){let o=t.el;o&&(o.matches(n)?e.push(o):e.push(...[].slice.call(o.querySelectorAll(n))))}e.length&&(u=[...e],d.getPlugins().Autoplay?.pause(),d.getPlugins().Autoscroll?.pause(),a.sync=d)}else(!o||c||r)&&(u=[].slice.call(t.querySelectorAll(n)));if(o&&!r&&(u=c?u.filter(e=>e.getAttribute(`${s}`)===c):[o]),!u.length)return;let g=e9.getInstance();if(g){let e=g.getOptions().triggerEl;if(e&&u.indexOf(e)>-1)return}return({...a.Carousel||{}}).rtl&&(u=u.reverse()),o&&(a.startIndex=u.indexOf(o)),e9.fromNodes(u,a)},fromNodes:function(e,t){t=f({},e3,t||{});let n=[],o=e=>e instanceof HTMLImageElement?e:e instanceof HTMLElement?e.querySelector("img:not([aria-hidden])"):void 0;for(let i of e){let l=i.dataset||{},a=t.delegateEl&&e.indexOf(i)===t.startIndex?t.delegateEl:void 0,r=o(a)||o(i)||void 0,s=l.src||i.getAttribute("href")||i.getAttribute("currentSrc")||i.getAttribute("src")||void 0,c=l.thumb||l.thumbSrc||r?.getAttribute("currentSrc")||r?.getAttribute("src")||r?.dataset.lazySrc||void 0,u={src:s,alt:l.alt||r?.getAttribute("alt")||void 0,thumbSrc:c,thumbEl:r,triggerEl:i,delegateEl:a};for(let e in l){let t=l[e]+"";t="false"!==t&&("true"===t||t),u[e]=t}n.push(u)}return e9.show(n,t)},fromSelector:function(e,t,n){let o=document.body,i="",l={};if(a(e)?i=e:e instanceof Element&&(o=e,a(t)&&(i=t),"object"==typeof n&&(l=n||{})),!(o&&o instanceof Element)||!i)return;let r=e9.openers.get(o);if(r&&(l=f({},r.get(i)||{},l)))return e9.fromNodes(Array.from(o.querySelectorAll(i)),l)},getCarousel:function(){return e9.getInstance()?.getCarousel()||void 0},getDefaults:function(){return e3},getInstance:function(e){if(e){let t=e6.get(e);return t&&t.getState()!==e4.Destroyed?t:void 0}return Array.from(e6.values()).reverse().find(e=>{if(e.getState()!==e4.Destroyed)return e})||void 0},getSlide:function(){return e9.getInstance()?.getSlide()||void 0},show:function(e=[],t={}){return(()=>{let e,t,n,o,i,c,g=e4.Init,p={...e3},v=-1,y={},b=[],E=!1,w=!0,x=0;function M(e,...t){let n=p[e];return n&&"function"==typeof n?n(eo,...t):n}function L(e,t=[]){let n=M("l10n")||{};e=String(e).replace(/\{\{(\w+)\}\}/g,(e,t)=>n[t]||e);for(let n=0;n<t.length;n++)e=e.split(t[n][0]).join(t[n][1]);return e=e.replace(/\{\{(.*?)\}\}/g,(e,t)=>t)}let S=new Map;function T(e,...t){let n=S.get(e)||[];for(let[t,o]of Object.entries(p.on||{}))(t===e||t.split(" ").indexOf(e)>-1)&&n.push(o);for(let e of n)e&&"function"==typeof e&&e(eo,...t);"*"!==e&&T("*",e,...t)}function R(){es(i,"is-revealing");try{document.activeElement===o&&(i?.querySelector("[autofocus]")||i).focus()}catch(e){}}function P(e){if(!q())return;if(g!==e4.Ready){e.preventDefault(),e.stopPropagation();return}if(e.defaultPrevented||!G.isClickAllowed())return;let t=e.composedPath()[0];t.closest(".fancybox__carousel")&&t.classList.contains("fancybox__slide")&&C(e)}function C(e){if(e.composedPath()[0].closest("[data-fancybox-close]"))return void Q(e);T("backdropClick",e),!e.defaultPrevented&&M("backdropClick")&&Q(e)}function O(e){if(!q()||g!==e4.Ready||(K(),e.defaultPrevented))return;let t=e.composedPath()[0],n=!!t.closest("[data-fancybox-close]"),o=t.classList.contains("fancybox__backdrop");(n||o)&&C(e)}function A(e,t){t.el?.addEventListener("click",P)}function z(t,n){I(n),("inline"===n.type||"clone"===n.type)&&function(t){if(!e||!t||!t.el)return;let n=null;if(a(t.src)){let e=t.src.split("#",2).pop();n=e?document.getElementById(e):null}if(n){if(h(n,"f-html"),"clone"===t.type||n.closest(".fancybox__carousel")){let e=(n=n.cloneNode(!0)).dataset.animationName;e&&(n.classList.remove(e),delete n.dataset.animationName);let o=n.getAttribute("id");o=o?`${o}--clone`:`clone-${v}-${t.index}`,n.setAttribute("id",o)}else if(n.parentNode){let e=document.createElement("div");e.inert=!0,n.parentNode.insertBefore(e,n),t.placeholderEl=e}t.htmlEl=n,h(t.el,"has-html"),t.el.prepend(n),n.classList.remove("hidden"),"none"===n.style.display&&(n.style.display=""),"none"===getComputedStyle(n).getPropertyValue("display")&&(n.style.display=n.dataset.display||"flex"),e?.emit("contentReady",t)}else e?.showError(t,"{{ELEMENT_NOT_FOUND}}")}(n),"ajax"===n.type&&function(t){let n=t.el;if(!n||t.htmlEl||t.xhr)return;e?.showLoading(t),t.state=eg.Loading;let o=new XMLHttpRequest;o.onreadystatechange=function(){if(o.readyState===XMLHttpRequest.DONE&&g===e4.Ready)if(e?.hideLoading(t),t.state=eg.Loaded,200===o.status){let i=o.responseText+"",l=null,a=null;if(t.filter){let e=document.createElement("div");e.innerHTML=i,a=e.querySelector(t.filter+"")}a&&a instanceof HTMLElement?l=a:(l=document.createElement("div")).innerHTML=i,l.classList.add("f-html"),t.htmlEl=l,n.classList.add("has-html"),n.classList.add("has-ajax"),n.prepend(l),e?.emit("contentReady",t)}else e?.showError(t)};let i=M("ajax")||null;o.open(i?"POST":"GET",t.src+""),o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.setRequestHeader("X-Requested-With","XMLHttpRequest"),o.send(i),t.xhr=o}(n)}function k(e,t){var n;(n=t).closeButtonEl&&(n.closeButtonEl.remove(),n.closeButtonEl=void 0),("inline"===t.type||"clone"===t.type)&&function(e){let t=e.htmlEl,n=e.placeholderEl;t&&("none"!==getComputedStyle(t).getPropertyValue("display")&&(t.style.display="none"),t.offsetHeight),n&&(t&&n.parentNode&&n.parentNode.insertBefore(t,n),n.remove()),e.htmlEl=void 0,e.placeholderEl=void 0}(t),t.xhr&&(t.xhr.abort(),t.xhr=void 0)}function I(t){let{el:n,htmlEl:o,closeButtonEl:i}=t;if(!n||!o||i)return;let l=M("closeButton");if("auto"===l&&(l=e?.getPlugins().Toolbar?.isEnabled()!==!0),l){let e=s(L(e1));e&&(t.closeButtonEl=o.insertAdjacentElement("afterbegin",e),n.classList.add("has-close-btn"))}}function $(){w=!1,i&&e&&i.classList.remove("is-revealing");let t=M("sync");if(e&&t){let n=t.getPageIndex(e.getPageIndex())||0;t.goTo(n,{transition:!1})}}function F(){if(g!==e4.Ready)return;H(B()),function(){if(!M("dragToClose")||!e)return;let t=e.getViewport();if(!t)return;let n=G(t).init();if(!n)return;let o=0,l=0,a=_().on("step",t=>{o=t.y;let n=e?.getViewport();if(i&&n){let e=m(Math.abs(o),0,.5*n.getBoundingClientRect().height,1,.5);i.style.setProperty("--f-drag-opacity",e+""),i.style.setProperty("--f-drag-offset",o+"px")}}).on("end",()=>{if(!o){i&&i.style.removeProperty("--f-opacity");let t=e?.getViewport();t&&(t.style.transform="")}});n.on("start",function(){a.pause()}).on("panstart",t=>{let n=t.srcEvent.target;n&&!u(n)&&e?.getViewport()?.classList.add("is-dragging")}).on("pan",function(t){let n=t.srcEvent.target;!(n&&u(n))&&e?.getViewport()&&"y"===t.axis&&(l+=t.deltaY,a.spring({clamp:!0,mass:1,tension:860,friction:17,restDelta:.01,restSpeed:.01}).from({y:o}).to({y:l}).start())}).on("end",function(e){a.pause(),"y"===e.axis&&Math.abs(e.velocityY)>5&&Math.abs(l)>0&&(Q(e.srcEvent,"f-throwOut"+(e.velocityY>0?"Down":"Up")),g===e4.Closing)||0!==l&&(l=0,a.spring({clamp:!0,mass:1,tension:140,friction:25,restDelta:.1,restSpeed:.1,maxSpeed:1/0}).from({y:o}).to({y:l}).start())})}(),document.body.addEventListener("click",O),document.body.addEventListener("keydown",N,{passive:!1,capture:!0}),X();let t=M("sync");t&&t.getTween()?.start()}function D(){e?.canGoNext()?X():J()}function H(t){if(!(w&&e&&e.getState()===ef.Ready&&t&&t.index===e.getOptions().initialPage&&t.el&&t.el.parentElement)||void 0!==t.state&&t.state!==eg.Loaded)return;w=!1;let n=t.panzoomRef,o=n?.getTween(),i=M("zoomEffect")?Z(t):void 0;if(n&&o&&i){let e=n.getScale("base")||1,{x:t,y:l}=n.getMousemovePos(e)||{x:0,y:0};o.spring({tension:225,friction:25,restDelta:.001,restSpeed:.001,maxSpeed:1/0}).from(i).to({x:t,y:l,scale:e}).start();return}let l=n?.getWrapper()||t.htmlEl;l&&e5(l,M("showClass",t))}function V(e,t){I(t),H(t)}function j(){K()}function N(t){if(!q()||g!==e4.Ready)return;let n=t.key,o=M("keyboard");if(!o||t.ctrlKey||t.altKey||t.shiftKey)return;let i=t.composedPath()[0];if(!r(i)||"Escape"!==n&&(e=>{let t="input,textarea,select,option,video,iframe,[contenteditable],[data-selectable],[data-draggable]";return e.matches(t)||e.closest(t)})(i)||(T("keydown",t),t.defaultPrevented))return;let l=o[n];if(l)switch(l){case"close":Q(t);break;case"next":t.preventDefault(),e?.next();break;case"prev":t.preventDefault(),e?.prev()}}function q(){return e9.getInstance()?.getId()===v}function B(){return e?.getPage()?.slides[0]}function W(){let e=B();return e?e.triggerEl||M("triggerEl"):void 0}function Z(e){let t=e.panzoomRef?.getWrapper()?.getBoundingClientRect(),n=t?.width,o=t?.height;if(!n||!o)return;let i=e.thumbEl;if(!i)return;let l=i.getBoundingClientRect(),a=l.width,r=l.height,s=l.left,c=l.top;if(!l||!a||!r||!(e=>{let t=e.getBoundingClientRect(),n=e.closest("[style]"),o=n?.parentElement;if(n&&n.style.transform&&o){let e=o.getBoundingClientRect();if(t.left<e.left||t.left>e.left+e.width-t.width||t.top<e.top||t.top>e.top+e.height-t.height)return!1}let i=Math.max(document.documentElement.clientHeight,window.innerHeight),l=Math.max(document.documentElement.clientWidth,window.innerWidth);return!(t.bottom<0)&&!(t.top-i>=0)&&!(t.right<0)&&!(t.left-l>=0)})(i))return;if(i instanceof HTMLImageElement){let e=window.getComputedStyle(i).getPropertyValue("object-fit");if("contain"===e||"scale-down"===e){let{width:t,height:n}=((e,t,n,o,i="contain")=>{if("contain"===i||e>n||t>o){let i=Math.min(n/e,o/t);e*=i,t*=i}return{width:e,height:t}})(i.naturalWidth,i.naturalHeight,a,r,e);s+=(a-t)*.5,c+=(r-n)*.5,a=t,r=n}}if(Math.abs(n/o-a/r)>.1)return;let u=s+.5*a-(t.left+.5*n);return{x:u,y:c+.5*r-(t.top+.5*o),scale:a/n}}function Y(){n&&clearTimeout(n),n=void 0,document.removeEventListener("mousemove",j)}function X(){if(E||n)return;let e=M("idle");e&&(n=setTimeout(U,e))}function U(){i&&(Y(),h(i,"is-idle"),document.addEventListener("mousemove",j),E=!0)}function K(){E&&(J(),X())}function J(){Y(),i?.classList.remove("is-idle"),E=!1}function Q(n,o){if(g===e4.Closing||g===e4.Destroyed)return;let i=new Event("shouldClose",{bubbles:!0,cancelable:!0});if(T("shouldClose",i,n),i.defaultPrevented)return;if(Y(),n){if(n.defaultPrevented)return;n.cancelable&&n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation()}if(g=e4.Closing,t?.pause(),e){e.getGestures()?.destroy(),e.getTween()?.pause();let t=B(),n=t?.panzoomRef;for(let o of(t&&n&&f(n.getOptions(),{clickAction:!1,wheelAction:!1,bounds:!1,minScale:0,maxScale:1/0}),e.getSlides()))o.panzoomRef?.getGestures()?.destroy(),o.panzoomRef?.getTween()?.pause()}let l=e?.getPlugins().fullscreen;l&&l.inFullscreen()?Promise.resolve(l.exit()).then(()=>{setTimeout(()=>{et(n,o)},150)}):et(n,o)}function et(t,n){if(g!==e4.Closing)return;if(T("close",t),M("placeFocusBack")){var o;let e=W();e&&!((o=e.getBoundingClientRect()).bottom>0&&o.right>0&&o.left<(window.innerWidth||document.documentElement.clientWidth)&&o.top<(window.innerHeight||document.documentElement.clientHeight))&&e.scrollIntoView({behavior:"instant",block:"center",inline:"center"})}M("fadeEffect")&&(i?.classList.remove("is-ready"),i?.classList.add("is-hiding")),i?.classList.add("is-closing");let l=B(),a=l?.panzoomRef,r=l?.panzoomRef?.getTween(),s=n||M("hideClass"),c=!1,u=!1;if(e&&l&&a&&r){let t;M("zoomEffect")&&700>(e.getTween()?.getCurrentVelocities()?.pos||0)&&l.state===eg.Loaded&&(t=Z(l)),t&&(c=!0,e.on("refresh",()=>{let e=Z(l);e&&r.to({...ee,...e})}),r.easing(_.Easings.EaseOut).duration(350).from({...a.getTransform()}).to({...ee,...t}).start())}let d=l?.htmlEl||l?.panzoomRef?.getWrapper();d&&e2(d),!c&&s&&d&&(u=!0,e5(d,s,()=>{en()})),c||u?setTimeout(()=>{en()},350):en()}function en(){if(g===e4.Destroyed)return;g=e4.Destroyed,document.body.removeEventListener("click",O),document.body.removeEventListener("keydown",N,{passive:!1,capture:!0});let t=W();for(let t of(T("destroy"),M("sync")?.getPlugins().Autoplay?.resume(),M("sync")?.getPlugins().Autoscroll?.resume(),o instanceof HTMLDialogElement&&o.close(),e?.getContainer()?.classList.remove("is-idle"),e?.destroy(),Object.values(y)))t?.destroy();if(y={},o?.remove(),o=void 0,i=void 0,e=void 0,e6.delete(v),!e6.size&&(d(!1),document.documentElement.classList.remove(e7),M("placeFocusBack")))try{t?.focus({preventScroll:!0})}catch(e){}}let eo={close:Q,destroy:en,getCarousel:function(){return e},getContainer:function(){return i},getId:function(){return v},getOptions:function(){return p},getPlugins:function(){return y},getSlide:function(){return B()},getState:function(){return g},init:function(t=[],n={}){return!function(t=[],n={}){g!==e4.Init&&(eo.destroy(),g=e4.Init),p=f({},e3,n),v=M("id")||`fancybox-${++e8}`;let a=e6.get(v);if(a&&a.destroy(),e6.set(v,eo),T("init"),function(){for(let[e,t]of Object.entries({...e9.Plugins,...p.plugins||{}}))if(e&&!y[e]&&t instanceof Function){let n=t();n.init(eo),y[e]=n}T("initPlugins")}(),function(e=[]){T("initSlides",e),b=[...e]}(t),function(){let t=M("parentEl")||document.body;if(!(t&&t instanceof HTMLElement)||!((o=s(L(M("mainTpl")||""))||void 0)&&o instanceof HTMLDialogElement)||!((i=o.querySelector(".fancybox__container"))&&i instanceof HTMLElement))return;let n=M("mainClass");n&&h(i,n);let a=M("mainStyle");if(a&&l(a))for(let[e,t]of Object.entries(a))i.style.setProperty(e,t);let r=M("theme"),c="auto"===r?window.matchMedia("(prefers-color-scheme:light)").matches:"light"===r;i.setAttribute("theme",c?"light":"dark"),o.setAttribute("id",`${v}`),o.addEventListener("keydown",e=>{"Escape"===e.key&&e.preventDefault()}),o.addEventListener("wheel",t=>{let n=t.target,o=M("wheel",t);n.closest(".f-thumbs")&&(o="slide");let i="slide"===o,l=Math.max(-1,Math.min(1,[-t.deltaX||0,-t.deltaY||0,-t.detail||0].reduce(function(e,t){return Math.abs(t)>Math.abs(e)?t:e}))),a=Date.now();if(x&&a-x<300){i&&t.preventDefault();return}x=a,T("wheel",t,l),t.defaultPrevented||("close"===o?Q(t):"slide"===o&&e&&!u(n)&&(t.preventDefault(),e[l>0?"prev":"next"]()))},{capture:!0,passive:!1}),o.addEventListener("cancel",e=>{Q(e)}),t.append(o),1===e6.size&&(M("hideScrollbar")&&d(!0),document.documentElement.classList.add(e7)),o.showModal(),T("initLayout")}(),function(){if(!(c=o?.querySelector(".fancybox__carousel")||void 0))return;let t=f({Autoplay:{autoStart:!1,pauseOnHover:!1,progressbarParentEl:e=>{let t=e.getContainer();return t?.querySelector(".f-carousel__toolbar [data-autoplay-action]")||t}},Fullscreen:{el:i},Toolbar:{absolute:!0,display:{left:["counter"],right:["toggleFull","autoplay","fullscreen","thumbs","close"]}},Video:{autoplay:!0},Zoomable:{Panzoom:{event:M("triggerEvent")}},classes:{container:"fancybox__carousel",viewport:"fancybox__viewport",slide:"fancybox__slide"},spinnerTpl:'<div class="f-spinner" data-fancybox-close></div>',dragFree:!1,slidesPerPage:1,plugins:{Sync:ew,Arrows:eR,Lazyload:eS,Zoomable:eb,Html:eD,Video:ej,Autoplay:eI,Fullscreen:eB,Thumbs:eF,Toolbar:ez}},M("Carousel")||{},{slides:b,enabled:!0,initialPage:M("startIndex")||0,l10n:M("l10n")});T("initCarousel",e=eh(c,t)),e.on("*",(e,t,...n)=>{T(`Carousel.${t}`,e,...n)}),e?.on("addSlide",A),e.on("attachSlideEl",z),e.on("detachSlideEl",k),e.on("contentReady",V),e.on("ready",F),e.on("change",$),e.on("settle",D),e.init()}(),o&&i){if(M("closeExisting"))for(let[e,t]of e6.entries())e!==v&&t.close();M("fadeEffect")?(setTimeout(()=>{R()},500),h(i,"is-revealing")):R(),i.classList.add("is-ready"),g=e4.Ready,T("ready")}}(t,n),eo},isCurrentSlide:function(e){let t=B();return!!e&&!!t&&t.index===e.index},isTopMost:function(){return q()},off:function(e,t){return S.has(e)&&S.set(e,S.get(e).filter(e=>e!==t)),eo},on:function(e,t){return S.set(e,[...S.get(e)||[],t]),eo},toggleIdle(e){(E||!0===e)&&U(),E&&!1!==e||J()}};return eo})().init(e,t)},unbind:function(e,t){let n=document.body,o="";if(a(e)?o=e:e instanceof Element&&(n=e,a(t)&&(o=t)),n){let e=e9.openers.get(n);e&&o&&e.delete(o),e?.size&&o||e9.openers.delete(n),n.removeEventListener("click",e9.fromEvent)}}};e.Arrows=eR,e.Autoplay=eI,e.Carousel=eh,e.CarouselSlideContentState=eg,e.CarouselState=ef,e.Fancybox=e9,e.FancyboxState=e4,e.Fullscreen=eB,e.Html=eD,e.Lazyload=eS,e.PANZOOM_DEFAULT_POS=ee,e.Panzoom=ea,e.PanzoomAction=J,e.PanzoomState=et,e.PanzoomZoomLevel=Q,e.Sync=ew,e.Thumbs=eF,e.Toolbar=ez,e.ToolbarColumn=eC,e.Video=ej,e.Zoomable=eb});
document.addEventListener("DOMContentLoaded", () => {

  //Swiper
  // (() => {
    const swiper = new Swiper(".mySwiper", {
      // slidesPerView: 3,
      spaceBetween: 20,
      autoHeight: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  // })();

  //Menu btn
  (() => {
    const menuBtn = document.querySelector(".menu__btn");
    const menuList = document.querySelector(".menu__list");

    if (menuBtn && menuList) {
      menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("active");
        menuList.classList.toggle("active");
      });
    }
  })();


  //Main page svg
  (() => {
    const svgContainer = document.getElementById("svgAnimationContainer");
    if (svgContainer) {
      bodymovin.loadAnimation({
        container: svgContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "images/stickers.json",
      });
    }
  })();


  //Btn up
  (() => {
    const el = document.querySelector(".btn-up");
    if (!el) return;

    const show = () => el.classList.remove("btn-up_hide");
    const hide = () => el.classList.add("btn-up_hide");

    window.addEventListener("scroll", () => {
      window.scrollY > 400 ? show() : hide();
    });

    el.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  })();


  // Desktop (Programs)
  function initDesktopTabs() {
    const filterTabs = document.querySelector(".programs__tabs");
    const filterButtons = document.querySelectorAll(".programs__tab-btn");
    const contents = document.querySelectorAll(".programs__tab-content");
    const tabColors = ["#cdf195", "#feffa5", "#ffd093", "#ef89c3"];

    if (!filterTabs || getComputedStyle(filterTabs).display === "none") return;

    filterTabs.addEventListener("click", (event) => {
      if (event.target.classList.contains("programs__tab-btn")) {
        const target = event.target;
        const contentId = target.dataset.content;
        const targetTranslateValue = target.dataset.translateValue;
        const tabIndex = [...filterButtons].indexOf(target);

        if (tabIndex !== -1) {
          filterTabs.style.backgroundColor = tabColors[tabIndex];
        }

        document.documentElement.style.setProperty(
          "--translate-filters-slider",
          targetTranslateValue
        );

        filterButtons.forEach((btn) => btn.classList.remove("programs-active"));
        target.classList.add("programs-active");

        contents.forEach((content) => {
          content.classList.toggle(
            "active",
            content.dataset.content === contentId
          );
        });
      }
    });
  }

  // Mobile tabs (Programs)
  function initMobileTabs() {
    const tabButtons = document.querySelectorAll(".programs-a__tab-btn");
    const tabContents = document.querySelectorAll(".programs-a__tab-content");

    if (
      !tabButtons.length ||
      getComputedStyle(tabButtons[0]).display === "none"
    )
      return;

    let activeTabId = null;

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const contentId = btn.dataset.content;
        const contentBlock = document.querySelector(
          `.programs-a__tab-content[data-content="${contentId}"]`
        );

        const isActive = activeTabId === contentId;

        if (isActive) {
          btn.classList.remove("active");
          contentBlock.classList.remove("active");
          activeTabId = null;
          return;
        }

        tabButtons.forEach((b) => b.classList.remove("active"));
        tabContents.forEach((c) => c.classList.remove("active"));

        btn.classList.add("active");
        contentBlock.classList.add("active");

        activeTabId = contentId;
      });
    });
  }

    initDesktopTabs();
    initMobileTabs();


  //Gallery
  (() => {
    const galleryContainer = document.getElementById("galleryContainer");
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    if (!galleryContainer || !loadMoreBtn) return;

    const photoSources = Array.from(
      { length: 21 },
      (_, i) => `images/photos/${i + 1}.jpg`
    );
    const photosPerPage = 9;
    let currentIndex = 0;

    function loadPhotos() {
      photoSources
        .slice(currentIndex, currentIndex + photosPerPage)
        .forEach((src) => {
          // Создаём <a>
          const link = document.createElement("a");
          link.href = src;
          link.setAttribute("data-fancybox", "gallery");

          // Создаём <img>
          const img = document.createElement("img");
          img.src = src;
          img.alt = "Фото галереи";
          img.loading = "lazy";
          img.classList.add("photos__item");

          // Вкладываем <img> в <a>, и <a> в контейнер
          link.appendChild(img);
          galleryContainer.appendChild(link);
        });

      currentIndex += photosPerPage;

      if (currentIndex >= photoSources.length) {
        loadMoreBtn.style.display = "none";
      }
    }

    loadMoreBtn.addEventListener("click", loadPhotos);
    loadPhotos();
  })();

  (() => {
    Fancybox.bind("[data-fancybox]", {
      // Your custom options
    });
  })();
});