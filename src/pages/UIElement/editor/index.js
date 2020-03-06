import { PureComponent } from 'react'
import { Row, Col, Card } from 'antd'
import { Editor } from 'components'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import draftToMarkdown from 'draftjs-to-markdown'

const colProps = {
  lg: 12,
  md: 24,
  style: {
    marginBottom: 28,
  },
}

class EditorPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      editorContent: null,
    }
  }
  onEditorStateChange = editorContent => {
    this.setState({
      editorContent,
    })
  }
  render() {
    const { editorContent } = this.state
    const textareaStyle = {
      minHeight: 496,
      width: '100%',
      background: '#f7f7f7',
      borderColor: '#f1f1f1',
      padding: '16px 8px',
    }
    return (
      <div>
        <Row gutter={24}>
          <Col {...colProps}>
            <Card title="Editor">
              <Editor
                wrapperStyle={{ minHeight: 496 }}
                editorStyle={{ height: '50%', overflow: 'auto' }}
                editorState={editorContent}
                onEditorStateChange={this.onEditorStateChange}
              />
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="HTML">
              <textarea
                style={textareaStyle}
                disabled
                value={
                  editorContent
                    ? draftToHtml(
                        convertToRaw(editorContent.getCurrentContent())
                      )
                    : ''
                }
              />
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="Markdown">
              <textarea
                style={textareaStyle}
                disabled
                value={
                  editorContent
                    ? draftToMarkdown(
                        convertToRaw(editorContent.getCurrentContent())
                      )
                    : ''
                }
              />
            </Card>
          </Col>
          <Col {...colProps}>
            <Card title="JSON">
              <textarea
                style={textareaStyle}
                disabled
                value={
                  editorContent
                    ? JSON.stringify(
                        convertToRaw(editorContent.getCurrentContent())
                      )
                    : ''
                }
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default EditorPage
