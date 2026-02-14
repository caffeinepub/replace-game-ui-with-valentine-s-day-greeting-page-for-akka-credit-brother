# Deployment Guide

This document provides step-by-step instructions for publishing the Valentine's Surprise application to the Internet Computer platform using the default platform domain.

## Prerequisites

- Project built and tested locally
- Access to the Internet Computer deployment platform
- No custom domain required (using default platform domain)

## Deployment Slug Requirements

When deploying to the Internet Computer platform, you must provide a valid slug that meets these criteria:

- **Length**: Between 5 and 50 characters
- **Allowed characters**: Lowercase letters (a-z), numbers (0-9), and hyphens (-)
- **Format**: Must start and end with a letter or number (not a hyphen)

### Valid Slug Examples
- `valentine-surprise-bmj5wgiubs` ✓
- `my-app-2026` ✓
- `hello-world-123` ✓

### Invalid Slug Examples
- `val` ✗ (too short, less than 5 characters)
- `Valentine-Surprise` ✗ (contains uppercase letters)
- `-my-app` ✗ (starts with hyphen)
- `my_app` ✗ (contains underscore)

## Deployment Steps

### 1. Prepare for Deployment

Ensure all code changes are committed and the application builds successfully:

