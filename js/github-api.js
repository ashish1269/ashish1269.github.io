$(document).ready( function(){

        $('div.input-group-btn button.btn.get-details').click(function(event){

            event.preventDefault();
            event.stopPropagation();

            userName = $('div.input-group input#user-name').val();

            if(userName.trim() != '') {
                loadRepos(userName);
            }

        });

        function loadRepos(userName) {

            $.get('https://api.github.com/users/' + userName, function(data, status){

                var userDetails = $('div.user-details div');

                userDetails.html('');

                var imageUrl = data.avatar_url;

                var fullName = data.name ? data.name : "";
                var bio = data.bio ? data.bio : "";
                var company = data.company ? data.company : "";
                var blog = data.blog ? data.blog : "";
                var location = data.location ? data.location : "";
                var email = data.email ? data.email : "";
                var hireable = data.hireable ? 'Yes' : 'No';
                var pub_repos = data.public_repos ? data.public_repos : "";
                var followers = data.followers ? data.followers : "";
                var following = data.following ? data.following : "";

                userDetails.append('<img src="'+ imageUrl +'">');
                userDetails.append('<h3>' + fullName + '</h3>');
                userDetails.append('<p>' + bio + '</p>');
                userDetails.append('<h3 class="details">Company : ' + company + '</h3>');
                userDetails.append('<h3 class="details">Blog : ' + blog + '</h3>');
                userDetails.append('<h3 class="details">Location : ' + location + '</h3>');
                userDetails.append('<h3 class="details">Email : ' + email + '</h3>');
                userDetails.append('<h3 class="details">Hireable : ' + hireable + '</h3>');
                userDetails.append('<h3 class="details">Repos : ' + pub_repos + '</h3>');
                userDetails.append('<h3 class="details">Followers : ' + followers + '</h3>');
                userDetails.append('<h3 class="details">Following : ' + following + '</h3>');

                /*-----  Repositories  -----*/

                var repoUrl = data.repos_url;

                $.get(repoUrl, function(data, status){

                    var temp = '';
                    var reposDiv = $('div.repos');

                    reposDiv.html('');

                    var repoDiv = '';
                    var repoName = '';
                    var repoUrl = '';
                    var repoCreatedAt = '';
                    var repoLanguage = '';
                    var repoForks = 0;
                    var repoWatchers = 0;

                    var repo;

                    for(index in data) {

                        repo = data[index];
                        temp += repo.name + '\n';

                        repoName = repo.name;
                        repoUrl = repo.html_url;
                        repoCreatedAt = repo.created_at;
                        repoLanguage = repo.language;
                        repoForks = repo.forks_count;
                        repoWatchers = repo.watchers;

                        repoDiv = '<div class="repo"></div>';
                        reposDiv.append(repoDiv);

                        repoDiv = $('div.repos div.repo').last();

                        repoName = '<h3 class="text-capitalize"><a href="'+ repoUrl +'">' + repoName + '</a></h3>';

                        repoCreatedAt = '<p class="text-muted"><span class="text-info">Created at : </span>' + repoCreatedAt.substr(0,10) + '</p>';

                        repoLanguage = '<p class="text-muted"><span class="text-info">Language : </span>' + repoLanguage + '</p>';

                        repoForks = '<p class="text-muted"><span class="text-info">Forks : </span>' + repoForks + '</p>';

                        repoWatchers = '<p class="text-muted"><span class="text-info">Watchers : </span>' + repoWatchers + '</p>';

                        repoDiv.append(repoName);
                        repoDiv.append(repoCreatedAt);
                        repoDiv.append(repoLanguage);
                        repoDiv.append(repoForks);
                        repoDiv.append(repoWatchers);

                    }

                });

            }, 'json')
            .fail(function(){
                var profilePic = $('div.user-profile-pic div img');
                profilePic.remove();
                alert('Can\'t fetch the data from that user!')
            });
        }
});
