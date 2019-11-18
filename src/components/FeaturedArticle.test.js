import React from 'react';
import ReactDOM from 'react-dom';
import FeaturedArticle from './FeaturedArticle';

it('Featured Article Comonent renders without crashing', () => {
    var div = document.createElement('div');
    ReactDOM.render(<FeaturedArticle />, div);
    ReactDOM.unmountComponentAtNode(div);
});




