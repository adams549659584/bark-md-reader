import './assets/css/markdown.css';
import MarkdownIt from 'markdown-it';
import defaultMdText from '../README.md?raw';
import { registerSW } from 'virtual:pwa-register';

registerSW();

const mdId = window.location.pathname.split('/')[2];
const appContainer = document.querySelector<HTMLDivElement>('.markdown-section');
const md = new MarkdownIt({
  html: true, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />).
  // This is only for full CommonMark compatibility.
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-', // CSS language prefix for fenced blocks. Can be
  // useful for external highlighters.
  linkify: true, // Autoconvert URL-like text to links

  // Enable some language-neutral replacement + quotes beautification
  // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
  typographer: true,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Could be either a String or an Array.
  //
  // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
  // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if the source string is not changed and should be escaped externally.
  // If result starts with <pre... internal wrapper is skipped.
  highlight: function (/*str, lang*/) {
    return '';
  },
});
const initMarkdowntHtml = async (mdText = '') => {
  const mdHtml = md.render(mdText || defaultMdText);
  appContainer!.innerHTML = mdHtml;
};

interface IMarkdownRes {
  code: number;
  message: string;
  data: {
    content: string;
  };
  timestamp: number;
}

const initMdHtmlById = async (mdId: string) => {
  const mdRes = await fetch(`/web/md/${mdId}`)
    .then<IMarkdownRes>(res => res.json())
    .catch(err => {
      console.error(err);
      return;
    });
  initMarkdowntHtml(mdRes?.data?.content);
};
if (mdId) {
  initMdHtmlById(mdId);
} else {
  initMarkdowntHtml();
}
