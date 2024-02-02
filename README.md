# use-search-state

[![npm version](https://img.shields.io/npm/v/@rdeak/use-search-state/latest.svg)](https://www.npmjs.com/package/@rdeak/use-search-state)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Store the state in the URL, share it, and easily recreate it.

## Installation

```bash
npm install react-router-dom @rdeak/use-search-state
```

or

```bash
npm install react-router-dom https://github.com/rdeak/use-search-state
```

## Usage

```javascript
import useSearchState from "@rdeak/use-search-state";

const [state, setState] = useSearchState();
// state = {}

// with initial values
const [withIntialState, setWithInitalState] = useSearchState({
  name: "Jane Doe",
});
// withIntialState = {"name": "Jane Doe"}

// set value
setState({ name: "John Doe", classes: ["G-1", "R-2"] });
// state = {"name":"John Doe", "classes": ["G-1","R-2"]}

// add just portion of state
setState({ address: "Main Road 8" });
// state = {"name":"John Doe", "classes": ["G-1","R-2"], "address": "Main Road 8"}

// numeric values are converted to string
setState({ height: 180 });
// state = {"name":"John Doe", "classes": ["G-1","R-2"], "address": "Main Road 8", "height": "180"}

// remove value
setState({ classes: null });
// state = {"name":"John Doe", "address": "Main Road 8"}

// clear all
setState(null);
// state = {}
```

## License

This project is licensed under the terms of the MIT license.
