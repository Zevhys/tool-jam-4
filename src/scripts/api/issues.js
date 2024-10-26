// https://api.bitbucket.org/2.0/repositories/{workspace}/{repo_slug}/issues/{issue_id}
// https://gitlab.example.com/api/v4/projects/{project_id}/issues/{issue_number}
// -https://api.github.com/repos/{owner}/{repo}/issues/{issue_number}

// function getIssueGithub(url) {
//   let inpParsed = /https:\/\/github\.com\/(.+)\/(.+)\/issues\/(\d+)/.exec(url);
//   let urlApi = `https://api.github.com/repos/${inpParsed[1]}/${inpParsed[2]}/issues/${inpParsed[3]}`;

//   fetch(urlApi)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data.state);
//     })
//     .catch((error) => console.error("Error:", error));
// }
