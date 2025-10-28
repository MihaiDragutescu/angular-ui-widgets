# Angular Ui Widgets

A lightweight Angular app showcasing two reusable standalone components:

- **`TGrid`** - data grid with sorting and pagination  
- **`TProgress`** - circular progress indicator
- A demo `App` component integrating both widgets.

---

## Features

### TGrid
- Column-based sorting
- Pagination with dynamic page size
- Emitted events for sort and pagination changes
- Sorting is handled in the parent, pagination is kept internal to respect the original component contract  

> For large datasets, virtualization could be considered in the future (no third-party libraries used).

### TProgress
- Reactive `progress` input using Angular signals 
- Emits a `complete` event when reaching 100%

---

## Run Locally

```bash
npm install
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## Running unit tests

To execute unit tests use the following command:

```bash
ng test
```
