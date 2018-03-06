document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault()
  search(true)
})
document.querySelector('button').addEventListener('click', () => {
  search(true)
})

document.querySelector('input[type="text"]').addEventListener('input', search)

/**
 * @param go {bool} - If true, page will navigate to the first result if there
 * exactly one.
 */
function search (go) {
  const query = document.querySelector('input[type="text"]').value

  const results = Object.keys(keyData).filter(host => host.includes(query.toLowerCase()))

  if(go === true && results.length === 1) {
    window.location.href = keyData[results[0]]
  }
  else showResults(results)
}

function showResults(results) {
  function result(host, url) {
    const div = document.createElement('div')
    const h3 = document.createElement('h3')
    const a = document.createElement('a')

    a.textContent = host
    a.href = url
    h3.appendChild(a)
    div.appendChild(h3)
    return div
  }

  const output = document.createElement('div')
  results.map(host =>
    result(host, keyData[host])
  ).forEach(node =>
    output.appendChild(node)
  )

  const resultsDiv = document.querySelector('.results')
  if(resultsDiv.lastChild) resultsDiv.removeChild(resultsDiv.lastChild)
  document.querySelector('.results').appendChild(output)
}

const keyData = {
  'github.com': 'https://help.github.com/articles/github-s-ssh-key-fingerprints/',
  'gitlab.com': 'https://about.gitlab.com/gitlab-com/settings/#ssh-host-keys-fingerprints',
  'bitbucket.com': 'https://confluence.atlassian.com/bitbucket/use-the-ssh-protocol-with-bitbucket-cloud-221449711.html#UsetheSSHprotocolwithBitbucketCloud-KnownhostorBitbucket%27spublickeyfingerprints'
}

search()
