$(document).ready(function () {
  // Server Locations
  $(".select-locations-btn").on("click", function () {
    let pid = $(this).attr("data-pid");
    $(".server-locations .locations .location").each(function (i, loc) {
      var url = new URL($(loc).attr("href"));
      url.searchParams.set("pid", pid);
      $(loc).attr("href", url.toString().replace("pid=11", "pid=" + pid));
    });
  });
  // Toggle Price Global [Upgrade Page]
  $(".toggle-plan-global").on("change", function () {
    if (this.checked) {
      $(".popular-plans .content .item .monthly-price").css("display", "none");
      $(".popular-plans .content .item .yearly-price").css("display", "block");
      $(".annual-plan-btn").addClass("active-btn");
      $(".monthly-plan-btn").removeClass("active-btn");
      // Hide Standard
      $(".standard-block-area").hide();
      // CPU Toggle
      $(".sp-premium").show();
      $(".sp-standard").hide();
    } else {
      $(".popular-plans .content .item .monthly-price").css("display", "block");
      $(".popular-plans .content .item .yearly-price").css("display", "none");
      $(".annual-plan-btn").removeClass("active-btn");
      $(".monthly-plan-btn").addClass("active-btn");
      // Show Standard
      $(".standard-block-area").show();
      // CPU Toggle
      $(".sp-premium").hide();
      $(".sp-standard").show();
    }
  });
});
