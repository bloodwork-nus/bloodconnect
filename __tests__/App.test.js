import React from 'react';
import { render } from "react-native-testing-library";

import App from "../App";

test("App.js has 1 child", () => {
    const tree = render(<App />).toJSON();
    expect(tree.children.length).toBe(1);
});