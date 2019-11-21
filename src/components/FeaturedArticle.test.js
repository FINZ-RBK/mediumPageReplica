import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import FeaturedArticle from './FeaturedArticle';
import { exportAllDeclaration, exportSpecifier } from '@babel/types';

it('Featured Article Comonent renders without crashing', () => {
    var div = document.createElement('div');
    ReactDOM.render(<FeaturedArticle />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('Featured Article Testing Suite', () => {
    it('snapshot renders', () => {
        var compoent = renderer.create(<FeaturedArticle headerTxt={"Featured stories"} />);
        var compJson = compoent.toJSON();
        expect(compJson).toMatchSnapshot();
    });
});




