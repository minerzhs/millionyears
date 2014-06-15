Comments = new Meteor.Collection('comments');

Meteor.methods({
  comment: function(commentAttributes){
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);

    if(!commentAttributes.body)
      throw new Meteor.Error(422, 'pls write sth');

    if(!post)
      throw new Meteor.Error(422, 'you must comment on a post');

    comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    Posts.update(comment.postId, {$inc: {commentsCount: 1}});

    comment._id = Comments.insert(comment);

    createCommentNotification(comment);

    return comment._id
  }
});