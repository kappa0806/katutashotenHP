# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a development environment configured for Go and TypeScript projects using devcontainers. The environment includes:
- Go (latest version) with golangci-lint
- Node.js
- Bun runtime
- Docker-in-Docker support

## Conversation Guidelines

- 常に日本語で会話する (Always communicate in Japanese)
- gitのメッセージも日本語で (Git messages should also be in Japanese)

## Development Environment

The project uses a devcontainer based on `ghcr.io/prulloac/base:bookworm` with the following features:
- Docker-in-Docker for containerized development
- Bun for fast JavaScript/TypeScript runtime
- Node.js for traditional JavaScript tooling
- Go with golangci-lint for Go development

## Project Structure

Currently minimal structure:
- `.devcontainer/` - Development container configuration
- `doc/` - Documentation directory (currently empty)
- `.claude/` - Claude-specific configuration

## Common Commands

Since this is a new project without established build scripts, commands will depend on the specific project type:

### For Go projects:
- `go mod init [module-name]` - Initialize a new Go module
- `go build` - Build the project
- `go test ./...` - Run all tests
- `golangci-lint run` - Run linter

### For TypeScript/JavaScript projects:
- `npm init` or `bun init` - Initialize a new project
- `npm install` or `bun install` - Install dependencies
- `npm run build` or `bun run build` - Build the project (if configured)
- `npm test` or `bun test` - Run tests (if configured)

## Development Notes

- The environment supports both Go and TypeScript/JavaScript development
- Docker is available for containerized development workflows
- Both npm and bun are available for JavaScript/TypeScript package management