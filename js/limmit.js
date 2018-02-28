/* Custom js for Limmit app */

  $(document).ready(function(){

    let domainURL = "https://www.reddit.com/";
    let query = "?query=javascript&";

    let redditsLimit = "limit=" + 100;

    let fullRedditsURL = domainURL + "reddits.json" + query + redditsLimit;

    let optionsArray = [];

    $.getJSON(fullRedditsURL, function(redditsJson) {
      // console.log(fullRedditsURL);
      // console.log(redditsJson);
      for (let i = 0; i < redditsJson.data.children.length; i++) {
        optionsArray.push(redditsJson.data.children[i].data.display_name);
      }

      optionsArray = optionsArray.sort(function (a, b) {
        return a.localeCompare(b, 'en', {'sensitivity': 'base'});
      });

      for (let j = 0; j < optionsArray.length; j++) {
        $("<option>" + optionsArray[j] + "</option>").appendTo("#reddits");
      }
    });

    $("#submit").on("click", function(e) {
      e.preventDefault();

      $(".search-cont").empty();
      $(".search-cont").show();

      $(".back-to-top").css('display','inline-block');

      let subreddit = "r/" + $("#subreddit").val() + "/";
      let sort = $("#dropdown-sort").val();
      let resultsLimit = "limit=" + $("#limit").val();

      let fullPostsURL = domainURL + subreddit + sort + ".json" + query + resultsLimit;
      // console.log(fullPostsURL);

      $.getJSON(fullPostsURL, function(searchJson) {
          // console.log(searchJson);
          for (let i = 0; i < searchJson.data.children.length; i++) {
            $("<div id=\"post" + i + "\" class=\"post\">").appendTo(".search-cont");
            $("<div class =\"thumbnail-cont\"><img class =\"thumbnail\">").appendTo("#post" + i);
            $("<div class =\"info\">").appendTo("#post" + i);
            $("<p class =\"title\">").appendTo("#post" + i + " .info");
            $("<p class =\"sr\">").appendTo("#post" + i + " .info");
            $("<p> <a class =\"url\" target=\"_blank\">").appendTo("#post" + i + " .info");
            $("<p> <a class =\"permalink\" target=\"_blank\">").appendTo("#post" + i + " .info");

            if (searchJson.data.children[i].data.thumbnail.startsWith("https://")) {
              $("#post" + i + " .thumbnail").attr("src", searchJson.data.children[i].data.thumbnail);
            }

            $("#post" + i + " .title").text(searchJson.data.children[i].data.title);
            $("#post" + i + " .sr").text("r/" + searchJson.data.children[i].data.subreddit);
            $("#post" + i + " .url").attr("href", searchJson.data.children[i].data.url);
            $("#post" + i + " .url").text(searchJson.data.children[i].data.url);
            $("#post" + i + " .permalink").attr("href", "https://www.reddit.com" + searchJson.data.children[i].data.permalink);
            $("#post" + i + " .permalink").text("View on Reddit");
          }
      });

      // Scrolls to top of page when 'Back to Top' link is clicked
      $(".back-to-top a").click(function() {
       $('html,body').animate({
           scrollTop: $("header").offset().top},
          1000
       );
      });
    })
  });
