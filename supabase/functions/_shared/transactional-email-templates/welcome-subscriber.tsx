import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Win The Night"

interface WelcomeSubscriberProps {
  name?: string
}

const WelcomeSubscriberEmail = ({ name }: WelcomeSubscriberProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome to {SITE_NAME} updates!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Heading style={h1}>
            {name ? `Welcome, ${name}!` : 'Welcome!'}
          </Heading>
        </Section>
        <Text style={text}>
          Thanks for subscribing to <strong>{SITE_NAME}</strong> updates. You'll be the first to hear about new episodes, behind-the-scenes content, and community news.
        </Text>
        <Text style={text}>
          We're building something real here — raw conversations about life, mental health, recovery, and everything in between.
        </Text>
        <Section style={ctaSection}>
          <Button style={button} href="https://winthenight.org">
            Visit Win The Night
          </Button>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>
          — The {SITE_NAME} Team
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: WelcomeSubscriberEmail,
  subject: `Welcome to ${SITE_NAME}!`,
  displayName: 'Welcome subscriber',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Helvetica Neue', Arial, sans-serif" }
const container = { padding: '30px 25px', maxWidth: '560px', margin: '0 auto' }
const headerSection = { padding: '20px 0 10px' }
const h1 = { fontSize: '26px', fontWeight: 'bold' as const, color: '#111111', margin: '0 0 20px', lineHeight: '1.3' }
const text = { fontSize: '15px', color: '#444444', lineHeight: '1.6', margin: '0 0 20px' }
const ctaSection = { textAlign: 'center' as const, margin: '30px 0' }
const button = {
  backgroundColor: '#00aaff',
  color: '#000000',
  fontWeight: 'bold' as const,
  fontSize: '15px',
  padding: '14px 30px',
  borderRadius: '10px',
  textDecoration: 'none',
  display: 'inline-block',
}
const hr = { borderColor: '#e5e5e5', margin: '30px 0' }
const footer = { fontSize: '13px', color: '#999999', margin: '0' }
