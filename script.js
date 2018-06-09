'use strict';

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  search(true);
});
document.querySelector('button').addEventListener('click', function () {
  search(true);
});

document.querySelector('input[type="text"]').addEventListener('input', search);

/**
 * @param go {bool} - If true, page will navigate to the first result if there
 * exactly one.
 */
function search(go) {
  var query = document.querySelector('input[type="text"]').value;

  var results = Object.keys(keyData).filter(function (host) {
    return host.includes(query.toLowerCase());
  });

  if (go === true && results.length === 1) {
    window.location.href = keyData[results[0]];
  } else showResults(results);
}

function showResults(results) {
  function result(host, url) {
    var div = document.createElement('div');
    var h3 = document.createElement('h3');
    var a = document.createElement('a');

    a.textContent = host;
    a.href = url;
    h3.appendChild(a);
    div.appendChild(h3);
    return div;
  }

  var output = document.createElement('div');
  results.map(function (host) {
    return result(host, keyData[host]);
  }).forEach(function (node) {
    return output.appendChild(node);
  });

  var resultsDiv = document.querySelector('.results');
  if (resultsDiv.lastChild) resultsDiv.removeChild(resultsDiv.lastChild);
  document.querySelector('.results').appendChild(output);
}

var keyData = {
  'bitbucket.com': 'https://confluence.atlassian.com/bitbucket/ssh-keys-935365775.html',
  'gist.github.com': 'https://help.github.com/articles/github-s-ssh-key-fingerprints/',
  'github.com': 'https://help.github.com/articles/github-s-ssh-key-fingerprints/',
  'gitlab.com': 'https://docs.gitlab.com/ee/user/gitlab_com/#ssh-host-keys-fingerprints',
  'sourceforge.net': 'https://sourceforge.net/p/forge/documentation/SSH%20Key%20Fingerprints/'
};

search();
