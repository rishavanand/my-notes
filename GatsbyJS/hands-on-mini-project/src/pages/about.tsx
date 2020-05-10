// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = (props: PageProps) => (
  <Layout>
    <SEO title="Page two" />
    <h1>About me</h1>
    <p>I'm a full stack consultant.</p>
  </Layout>
)

export default AboutPage
