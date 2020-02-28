import React, { Component } from 'react'
import BaseLayout from './BaseLayout'
import { I18nProvider } from '@lingui/react'
import { ConfigProvider } from 'antd'
import { langFromPath, defaultLanguage } from 'utils'
import withRouter from 'umi/withRouter'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import en_US from 'antd/lib/locale-provider/en_US'
import pt_BR from 'antd/lib/locale-provider/pt_BR'

const languages = {
  zh: zh_CN,
  en: en_US,
  'pt-br': pt_BR
}

@withRouter
class Layout extends Component {
  state = {
    catalogs: {},
  }

  language = defaultLanguage

  // 动态加载catalog：https://lingui.js.org/guides/dynamic-loading-catalogs.html?highlight=await%20import

  // shouldComponentUpdate在第一次渲染时，不会执行，因此手动的在componentDidMount中加载catalog
  componentDidMount() {
    const language = langFromPath(this.props.location.pathname)
    this.language = language
    language && this.loadCatalog(language)
  }

  // 在language完全改变前，动态加载catalog
  shouldComponentUpdate(nextProps, nextState) {
    const language = langFromPath(nextProps.location.pathname)
    const preLanguage = this.language
    const { catalogs } = nextState

    if (preLanguage !== language && !catalogs[language]) {
      language && this.loadCatalog(language)
      this.language = language
      return false
    }
    this.language = language
    // 直到catalog加载完成才重新渲染组件
    return true
  }

  loadCatalog = async language => {
    const catalog = await import(
      /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
      `@lingui/loader!../locales/${language}/messages.json`
    )

    this.setState(state => ({
      catalogs: {
        ...state.catalogs,
        [language]: catalog,
      },
    }))
  }
  render() {
    const { children, location } = this.props
    const { catalogs } = this.state

    let language = langFromPath(location.pathname)
    // 如果语言包未加载完或正在加载，使用默认语言
    if (!catalogs[language]) language = defaultLanguage
    return (
      <ConfigProvider locale={languages[language]}>
        <I18nProvider language={language} catalogs={catalogs}>
          <BaseLayout>{children}</BaseLayout>
        </I18nProvider>
      </ConfigProvider>
    )
  }
}

export default Layout
