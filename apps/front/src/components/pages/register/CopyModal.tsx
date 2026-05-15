'use client'
import { Box, Center, css, Flex, Text, VStack } from '@devup-ui/react'
import { useState } from 'react'

import { IconButton } from '@/components/buttons/IconButton'
import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS } from '@/components/icons/iconPaths'
import { useLang } from '@/hooks/useLang'

interface CopyModalProps {
  content: string
  issueUrl: string
  onClose: () => void
}

export function CopyModal({ content, issueUrl, onClose }: CopyModalProps) {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Box
      bottom="0"
      left="0"
      onClick={onClose}
      position="fixed"
      right="0"
      top="0"
      zIndex="9999"
    >
      <Box
        bottom="0"
        left="0"
        position="absolute"
        right="0"
        style={{ background: 'rgba(0,0,0,0.5)' }}
        top="0"
      />
      <Center h="100%" p="$spacingSpacing20" position="relative">
        <VStack
          bg="$containerBackground"
          border="solid 1px $border"
          borderRadius="$spacingSpacing24"
          boxShadow="$shadowShadowXs"
          gap="$spacingSpacing16"
          h="50vh"
          maxW="600px"
          onClick={(e) => e.stopPropagation()}
          p="$spacingSpacing24"
          w="100%"
        >
          <Flex alignItems="center" justifyContent="space-between" w="100%">
            <Text color="$title" typography="title">
              {t.register.copyModalTitle}
            </Text>
            <IconButton
              aria-label="close"
              className={css({ bg: '$text' })}
              icon="close"
              onClick={onClose}
            />
          </Flex>

          <Text
            color="$textSub"
            typography="body"
            whiteSpace="pre-line"
            wordBreak="keep-all"
          >
            {t.register.copyModalDesc}
          </Text>

          <Box
            border="solid 1px $border"
            borderRadius="$spacingSpacing12"
            flex="1"
            overflow="auto"
            p="$spacingSpacing12"
            w="100%"
            whiteSpace="pre-line"
          >
            {content}
          </Box>

          <Flex gap="$spacingSpacing08" w="100%">
            <Center
              _active={{ opacity: '0.8' }}
              _hover={{ opacity: 1.1 }}
              as="button"
              bg={copied ? '$primary' : '$containerBackground'}
              border="solid 1px $border"
              borderRadius="$spacingSpacing12"
              cursor="pointer"
              flex="1"
              h="44px"
              onClick={handleCopy}
              transition="background-color 0.2s ease, opacity 0.2s ease"
              type="button"
            >
              <Text color={copied ? '#FFF' : '$text'} typography="buttonSm">
                {copied ? t.register.copiedButton : t.register.copyButton}
              </Text>
            </Center>

            <Flex
              _active={{ opacity: '0.8' }}
              _hover={{ opacity: 1.1 }}
              alignItems="center"
              as="a"
              bg="$primary"
              borderRadius="$spacingSpacing12"
              cursor="pointer"
              flex="1"
              gap="$spacingSpacing08"
              h="44px"
              href={issueUrl}
              justifyContent="center"
              rel="noopener noreferrer"
              target="_blank"
              transition="opacity 0.2s ease"
            >
              <Icon boxSize="20px" color="#FFF" iconPath={ICON_PATHS.github} />
              <Text color="#FFF" typography="buttonSm">
                {t.register.githubButton}
              </Text>
            </Flex>
          </Flex>
        </VStack>
      </Center>
    </Box>
  )
}
