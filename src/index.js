import * as $ from 'jquery'
import Post from '@models/Post'
import './styles/styles.css'
import WebpackLogo from './assets/webpack-splash.png'
import json from './assets/json.json'
import xml from './assets/data.xml'
import csv from './assets/data.csv'

const post = new Post('webPack post title', WebpackLogo)

$('pre').addClass('code').html(post.toString())

console.log('post to string', post.toString())

console.log('JSON', json)
console.log('XML', xml)
console.log('csv', csv)