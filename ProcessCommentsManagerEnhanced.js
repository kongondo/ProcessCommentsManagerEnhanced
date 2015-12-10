$(document).ready(function() {

	$("a.CommentTextEdit").click(function() {
		var $textarea = $("<textarea></textarea>");
		var $parent = $(this).closest('.CommentTextEditable');
		$parent.parent('.CommentText').removeClass('CommentTextOverflow');
		$textarea.attr('name', $parent.attr('id')); 
		//$textarea.height($parent.height()); 
		$(this).remove(); // remove edit link
		$textarea.val($parent.text()); 
		$parent.after($textarea);
		$parent.remove();
		return false; 
	}); 

	$(".CommentText").click(function() {
		$(this).find('a.CommentTextEdit').click();
		return false;
	}); 

	$(".CommentItem").each(function() {
		var $item = $(this);
		var $table = $item.find(".CommentItemInfo"); 
		var height = $table.height() + 30;
		var $text = $item.find(".CommentText"); 
		if($text.height() > height) {
			$text.addClass('CommentTextOverflow'); 
		}
	});
}); 


/******* @@kongondo ******/
$(document).ready(function() {


	/*************************************************************/
	// ## GLOBALS ## 

	selAction = 'select#CommentsActionSelect';
	action ='';
	commAction = 'input.CommentAction';
	commentHighlight = 'CommentHighlight';

	/*************************************************************/
	// ## FUNCTIONS ## 

	// update a comments status
	updateCommentStatus = function (mode, action) {

		// update comment status with selected select's status value 
		if(mode === 1) {
			$.each($(commAction + ':checked'), function(){            
				$(this).val(action);
			});
		}
		// if blank 'select' [no selection], revert comment status to original status
		else if(mode === 0) {
			$.each($(commAction), function(){            
				var originalStatus = ($(this).attr('data-original'));
				$(this).val(originalStatus);
			});
		}
		// if checkbox uncheched, revert comment status to original status
		else if(mode === -1) {
			$.each($(commAction).not(':checked'), function(){            
				var originalStatus = ($(this).attr('data-original'));
				$(this).val(originalStatus);
			});
		}
	}


	/*************************************************************/

	/*** changes a comments status values (approved=1; pending=0; spam=-2; delete=999) ***/

	// if checkboxes selected first, then select
	// on change 'select an action', ready for submit
	$(selAction).on('change', function() {
		action = $(selAction).val();
		if(action) updateCommentStatus(1, action);
		// revert to original value if blank selected
		else updateCommentStatus(0, action);
	});

	// if select was selected first, then checkboxes
	// if 'blank' value selected, don't change value
	$(commAction).on('change', function() {

		// highlight/unhighlight selected comment on checkbox
		if ($(this).prop('checked')) $(this).closest('div.CommentItem').addClass(commentHighlight);
		else $(this).closest('div.CommentItem').removeClass(commentHighlight);

		action = $(selAction).val();
		if(action) if(action) updateCommentStatus(1, action);

		// if checkbox unchecked, revert to original value
		updateCommentStatus(-1, action);

	});


	// Toggle select all comment checkboxes
	$('input#CommentActionAll').click(function(){

		action = $(selAction).val();

		if ($(this).prop('checked')) {
			$(commAction, 'table.CommentItemInfo').prop('checked', true);
			$(commAction, 'table.CommentItemInfo').closest('div.CommentItem').addClass(commentHighlight);

			// update all checked boxes values to match currently selected 'select status value'
			if(action) updateCommentStatus(1, action);
			// revert to original value if blank selected
			else updateCommentStatus(0, action);

		}

		else {
			$(commAction, 'table.CommentItemInfo').prop('checked', false);
			$(commAction, 'table.CommentItemInfo').closest('div.CommentItem').removeClass(commentHighlight);

			// if checkbox unchecked, revert to original value
			updateCommentStatus(-1, action);
		}
	});


	// submit form on select of limit of items to show comments
	/*	$('#limit').change(function () {
			$(this).closest('form').submit();
		});
	// broken in PW dev 2.5.7. See issue #784 on GitHub
	*/

	$('select#CommentsLimitSelect').change(function(){ $(this).closest("form").removeClass("nosubmit").submit(); });// @note: workaround for PW issue #784 (GitHub)

}); 

/******* END @@kongondo ******/


