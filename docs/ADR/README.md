# Architecture Decision Records (ADRs)

This directory contains Architecture Decision Records (ADRs) for the Anki Free AI Image Occlusion project. ADRs document important architectural decisions, along with their context and consequences.

## What is an ADR?

An Architecture Decision Record (ADR) is a document that captures an important architectural decision made along with its context and consequences. Each ADR:

- Describes a single architectural decision
- Explains the context and problem being solved
- Documents the decision made
- Lists the consequences (positive and negative)
- Explains why alternatives were rejected

## ADR Index

| ADR                                      | Title                               | Status   | Date       |
| ---------------------------------------- | ----------------------------------- | -------- | ---------- |
| [001](001-offline-first-architecture.md) | Offline-First Architecture          | Accepted | 2025-01-10 |
| [002](002-webassembly-integration.md)    | WebAssembly Integration             | Accepted | 2025-01-10 |
| [003](003-framework-choice.md)           | React + TypeScript Framework Choice | Accepted | 2025-01-10 |

## ADR Template

When creating new ADRs, use this template:

```markdown
# ADR-XXX: [Title]

## Status

[Proposed/Accepted/Rejected/Superseded]

## Context

[Describe the context and problem that necessitates a decision]

## Decision

[Describe the decision that was made]

## Consequences

[Describe the consequences of applying the decision, both positive and negative]

## Implementation Details

[Technical details about how the decision is implemented]

## Alternatives Considered

[Describe alternative solutions that were considered and why they were rejected]

## Future Considerations

[Any future plans or considerations related to this decision]

## Related Decisions

[List related ADRs]

## References

[Links to relevant documentation]
```

## How to Create a New ADR

1. Create a new file in this directory following the naming convention `XXX-title.md`
2. Use the template above
3. Update this index file to include the new ADR
4. Submit as part of a pull request with the implementation

## ADR Lifecycle

1. **Proposed**: Initial draft for discussion
2. **Accepted**: Decision has been made and implemented
3. **Rejected**: Decision was not accepted
4. **Superseded**: Decision has been replaced by a new one

## Review Process

ADRs should be reviewed by:

- Technical lead
- Relevant team members
- Architecture review board (if applicable)

## Archival

Superseded ADRs should be kept for historical context but marked as superseded with a link to the new decision.
