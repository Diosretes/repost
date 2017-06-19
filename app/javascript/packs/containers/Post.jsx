import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import * as postActions from '../actions/postActions'
import { Authorization } from './Authorization'
import PostHeader from '../components/PostHeader'
import PostContent from '../components/PostContent'
import endpoints from '../config/endpoints'
import styles from '../styles/Post.scss'
import { withRouter } from 'react-router'

class Post extends Component {
  constructor(props) {
    super(props)
    this.createStar = this.createStar.bind(this)
    this.deleteStar = this.deleteStar.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  createStar(post) {
    this.props.createStar(endpoints.postStars(post.id))
  }

  deleteStar(post) {
    this.props.deleteStar(endpoints.postStars(post.id))
  }

  handleClick(id) {
    if (window.confirm('Are you sure?')) {
      this.props.deletePost(endpoints.mePost(id), this.props.location.pathname)
    }
  }

  render() {
    const { post } = this.props
    return (
      <div styleName="container">
        <Authorization type="author" post={post}>
          <PostHeader post={post} onClick={this.handleClick} />
        </Authorization>
        <PostContent
          post={post}
          createStar={this.createStar}
          deleteStar={this.deleteStar} />
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  createStar: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  deleteStar: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    post: state.post
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(postActions, dispatch)
}

Post = CSSModules(Post, styles)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
