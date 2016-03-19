/*globals $ */
/*********** ratings functions **************/

/***
 RatingsGraph UI widget
**/

function RatingsGraph(summary, parent)
{
	this.summary = summary;		
	this.parent = parent;
	this.getWidth = function (summary, totsum) {
		if (totsum == 0) {
			return 0;
		}
		return summary * 100 / totsum;
	};
	this.make();
}

RatingsGraph.prototype.make = function ()
{
	if (this.parent) {
		this.parent.empty();
		var totsum = this.summary.One + this.summary.Two + this.summary.Three + this.summary.Four + this.summary.Five;
		this.parent.append("<ul class='rating_history'>");	
		$(".rating_history").append("<li class='star_5'><div class='grey_bar'><div class='black_bar' style='width: " + this.getWidth(this.summary.Five, totsum) + "%'></div></div>" + this.summary.Five + "</li>");
		$(".rating_history").append("<li class='star_4'><div class='grey_bar'><div class='black_bar' style='width: " + this.getWidth(this.summary.Four, totsum) + "%'></div></div>" + this.summary.Four + "</li>");
		$(".rating_history").append("<li class='star_3'><div class='grey_bar'><div class='black_bar' style='width: " + this.getWidth(this.summary.Three, totsum) + "%'></div></div>" + this.summary.Three + "</li>");
		$(".rating_history").append("<li class='star_2'><div class='grey_bar'><div class='black_bar' style='width: " + this.getWidth(this.summary.Two, totsum) + "%'></div></div>" + this.summary.Two + "</li>");
		$(".rating_history").append("<li class='star_1'><div class='grey_bar'><div class='black_bar' style='width: " + this.getWidth(this.summary.One, totsum) + "%'></div></div>" + this.summary.One + "</li>");
		this.parent.append("</ul");
	}
};

/***
RatingsSummary UI widget
**/
function RatingsSummary(summary, parent) {
	this.summary = summary;		
	this.parent = parent;
	this.make();
}

RatingsSummary.prototype.make = function () {
	if (this.parent) {
		this.parent.empty();
		var totsum = this.summary.One + this.summary.Two + this.summary.Three + this.summary.Four + this.summary.Five;
		if (totsum == 0) {
			this.parent.append("<div class='rating_wrap rating_unrated' title='Unrated'><span>Unrated</span></div>");
		} else {
			var avg = Math.round((this.summary.One + (this.summary.Two * 2) + (this.summary.Three * 3) + (this.summary.Four * 4) + (this.summary.Five * 5)) * 100 / totsum);
			avg = avg / 100;
			
			var starAvg = avg * 2;
			starAvg = Math.round(starAvg) / 2;
			starAvg = starAvg.toFixed(1) + '';
			starAvg = starAvg.replace('.', '_');
			this.parent.append("<div class='rating_wrap rating_star_" + starAvg + "' title='" + avg + " out of 5 stars'><span style='width: " + avg + "%'>" + avg + " out of 5 stars</span></div>");
		}
	}
};


