import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import d3tip from 'd3-tip';

import { Loader, Dimmer } from 'semantic-ui-react';
import CloudControls from './cloud/CloudControls';

import { prepareText, prepareStopWords, removeStopWords, removePossibleErrors } from '../helpers/wordTools';

const axios = require('axios');
let englishWords;
axios.get('/assets/words-eng.json').then((response) => {
    englishWords = response.data;
});

class CloudContainer extends Component {
    constructor(props) {
        super(props);
        
        this.makeCloud = this.makeCloud.bind(this);
        this.draw = this.draw.bind(this);
        
        this.state = { 
            cloud: null,
            words: [],
            loading: false,
            removeErrors: false,
        };
        
        this.renderCloud = this.renderCloud.bind(this);
        this.updateWordRemoval = this.updateWordRemoval.bind(this);
    }
    makeCloud(wordData) {
        return cloud()
            .size([this.refs.cloudOutRef.offsetWidth-4, 500])
            // -4px to account for the border (2px on each side)
            .words(wordData)
            .padding(5)
            .rotate(function() { return (~~(Math.random() * 6) - 3) * 20; })
            .font("Impact")
            .fontSize(function(d) { return d.size; })
            .on("end", this.draw);
    }
    renderCloud() {
        this.setState({loading: true}, () => {
            const wordData = prepareText(this.props.text);
            
            const stopWords = prepareStopWords(this.props.stopWords);
            let cloudData = removeStopWords(wordData, stopWords);
            
            if (this.state.removeErrors) {
                cloudData = removePossibleErrors(cloudData, 4, englishWords)
            }
            
            const values = cloudData.map(data => data.size);
            const scale = d3.scaleLinear()
                .domain([Math.min(...values), Math.max(...values)])
                .range([25,125]);
            
            // wordData = wordData.map((data) => { data.size = scale(data.size); });
            cloudData.forEach((data) => {
                data.frequency = data.size;
                data.size = scale(data.size);
            });
            
            // console.table(cloudData);
            
            this.setState({
                cloud: this.makeCloud(cloudData),
                loading: false,
            },
            () => { this.state.cloud.start() });
        })
        
    }
    draw(words) {
        const tip = d3tip()
            .attr('class', 'd3-tip')
            .offset([-5, 0])
            .html(function(d) {
            return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
            })
        
        const layout = this.state.cloud;
        const fill = d3.schemeCategory20;
        d3.select('svg').remove();
        d3.select("#cloud-output").append("svg")
            .attr("width", layout.size()[0])
            .attr("height", layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill[i%20]; })
            .attr("text-anchor", "middle")
            .attr("data-freq", function(d) { return d.frequency; })
            .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; })
            .call(tip)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);
    }
    updateWordRemoval() {
        this.setState((prevState) => ({ removeErrors: !prevState.removeErrors }));
    }
    render() {
        return (
            <div id="cloud-elements">
                <CloudControls
                    text={this.props.text}
                    stopWords={this.props.stopWords}
                    changeText={this.props.changeText}
                    changeStopWords={this.props.changeStopWords}
                    renderCloud={this.renderCloud}
                    setText={this.props.setText}
                    updateWordRemoval={this.updateWordRemoval}
                    wordRemoval={this.state.removeErrors}
                />
                
                <div id="cloud-output" ref="cloudOutRef" className="dimmable">
                    <Dimmer inverted active={this.state.loading}>
                        <Loader inverted>Generating Word Cloud</Loader>
                    </Dimmer>
                </div>
                
            </div>
        );
    }
}

CloudContainer.propTypes = {
    text: PropTypes.string.isRequired,
    stopWords: PropTypes.string.isRequired,
    changeText: PropTypes.func.isRequired,
    changeStopWords: PropTypes.func.isRequired,
};

export default CloudContainer;
