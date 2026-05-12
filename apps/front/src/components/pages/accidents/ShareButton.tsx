'use client'

import { Box, Flex, Text } from '@devup-ui/react'
import { useEffect, useRef, useState } from 'react'

import { Icon } from '@/components/icons/Icon'
import { ICON_PATHS } from '@/components/icons/iconPaths'

export function ShareButton() {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleClick = async () => {
    if (typeof window === 'undefined') return
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = url
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Box pos="relative">
      <Box
        _active={{ opacity: 0.6 }}
        _hover={{ opacity: 0.7 }}
        aria-label="링크 복사"
        as="button"
        bg="transparent"
        border="none"
        cursor="pointer"
        display="block"
        onClick={handleClick}
        p="0px"
        transition="opacity .15s ease"
        type="button"
      >
        <Icon
          boxSize="20px"
          color="var(--caption)"
          iconPath={ICON_PATHS.networkShare}
        />
      </Box>
      <Flex
        alignItems="center"
        bg="$text"
        borderRadius="$spacingSpacing08"
        bottom={['auto', null, null, null, 'calc(100% + 8px)']}
        gap="$spacingSpacing04"
        left={['auto', null, null, null, '50%']}
        opacity={copied ? 1 : 0}
        pointerEvents="none"
        pos="absolute"
        px="12px"
        py="6px"
        right={['0', null, null, null, 'auto']}
        top={['calc(100% + 8px)', null, null, null, 'auto']}
        transform={['none', null, null, null, 'translateX(-50%)']}
        transition="opacity .15s ease"
        whiteSpace="nowrap"
        zIndex="10"
      >
        <Text color="$containerBackground" typography="captionSb">
          복사되었어요.
        </Text>
        <Box
          borderColor={[
            'transparent transparent var(--text) transparent',
            null,
            null,
            null,
            'var(--text) transparent transparent transparent',
          ]}
          borderStyle="solid"
          borderWidth={[
            '0 4px 4px 4px',
            null,
            null,
            null,
            '4px 4px 0 4px',
          ]}
          bottom={['100%', null, null, null, 'auto']}
          h="0"
          left={['auto', null, null, null, '50%']}
          pos="absolute"
          right={['6px', null, null, null, 'auto']}
          top={['auto', null, null, null, '100%']}
          transform="translateX(-50%)"
          w="0"
        />
      </Flex>
    </Box>
  )
}
