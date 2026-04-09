import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Win The Night"

interface BroadcastUpdateProps {
  subject?: string
  bodyHtml?: string
}

const BroadcastUpdateEmail = ({ subject, bodyHtml }: BroadcastUpdateProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{subject || `Update from ${SITE_NAME}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Text style={brandTag}>{SITE_NAME}</Text>
          <Heading style={h1}>{subject || `Update from ${SITE_NAME}`}</Heading>
        </Section>
        {bodyHtml ? (
          <Section dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        ) : (
          <Text style={text}>No content provided.</Text>
        )}
        <Hr style={hr} />
        <Text style={footer}>
          You received this because you subscribed to {SITE_NAME} updates.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: BroadcastUpdateEmail,
  subject: (data: Record<string, any>) => data.subject || `Update from ${SITE_NAME}`,
  displayName: 'Broadcast update',
  previewData: { subject: 'New Episode Drop!', bodyHtml: '<p style="font-size:15px;color:#444;line-height:1.6;">Hey fam! We just dropped a brand new episode. Check it out on YouTube.</p>' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Helvetica Neue', Arial, sans-serif" }
const container = { padding: '30px 25px', maxWidth: '560px', margin: '0 auto' }
const headerSection = { padding: '20px 0 10px' }
const brandTag = { fontSize: '12px', fontWeight: 'bold' as const, color: '#00aaff', textTransform: 'uppercase' as const, letterSpacing: '1px', margin: '0 0 8px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#111111', margin: '0 0 25px', lineHeight: '1.3' }
const text = { fontSize: '15px', color: '#444444', lineHeight: '1.6', margin: '0 0 20px' }
const hr = { borderColor: '#e5e5e5', margin: '30px 0' }
const footer = { fontSize: '12px', color: '#999999', margin: '0' }
