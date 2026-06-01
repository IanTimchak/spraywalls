# SprayWalls Software Requirements Specification

## 1. Introduction

### 1.1 Purpose

This document defines the initial software requirements for SprayWalls. It is intended to guide product planning, implementation, testing, and future design decisions.

SprayWalls is a mobile application for digitizing real climbing walls and spray walls. Users can create interactive boards from wall photos, define holds, create routes, log ascents, and participate in boards created by other users.

### 1.2 Scope

The system shall support:

- User accounts and authentication.
- Board creation from a wall image.
- Hold outlining and hold management on board images.
- Stacked-hold representation.
- Interactive board use.
- Route creation and publishing.
- Ascent, attempt, note, and grade logging.
- Board discovery and participation.
- Community grade aggregation.
- Historical ascent tracking.

### 1.3 Definitions

| Term                | Definition                                                                        |
| ------------------- | --------------------------------------------------------------------------------- |
| Account             | A registered user identity in SprayWalls.                                         |
| Board               | A digital representation of a physical climbing wall.                             |
| Board Admin         | A user with permission to manage a board, its image, holds, routes, and settings. |
| Hold                | A physical climbing hold represented as an interactable region on a board image.  |
| Hold Outline        | The shape or region on an image that defines a hold's interactive area.           |
| Stacked Hold        | A hold mounted directly into, onto, or overlapping another hold.                  |
| Route               | A climb defined by selected holds on a board.                                     |
| Ascent              | A user's logged result for a route.                                               |
| Attempt             | A logged effort on a route that may or may not result in an ascent.               |
| Grade Proposal      | A user-submitted opinion of route difficulty on the V scale.                      |
| Community Grade     | A representative grade derived from submitted grade proposals.                    |
| Participating Board | A board a user has joined, subscribed to, administers, or otherwise follows.      |

## 2. System Actors

### 2.1 Anonymous User

An unauthenticated user who may view content permitted for public access.

### 2.2 Authenticated User

A signed-in user who can interact with boards, routes, ascents, and account-specific features according to permissions.

### 2.3 Board Member

An authenticated user who has joined, subscribed to, or participates in a board.

### 2.4 Route Creator

A user permitted to create routes on a board.

### 2.5 Board Admin

A user permitted to manage board configuration, board image, hold outlines, stacked-hold relationships, routes, members, and board visibility.

### 2.6 Board Owner

The user or organization with ultimate control of a board and its admin assignments.

## 3. Functional Requirements

### 3.1 Account Management

REQ-ACC-001: The system shall allow a user to create an account.

REQ-ACC-002: The system shall allow a user to sign in to an existing account.

REQ-ACC-003: The system shall allow a signed-in user to sign out.

REQ-ACC-004: The system shall maintain an authenticated session across app restarts when permitted by the authentication provider.

REQ-ACC-005: The system shall provide each account with a user profile.

REQ-ACC-006: The system shall allow a user to view boards they own.

REQ-ACC-007: The system shall allow a user to view boards they administer.

REQ-ACC-008: The system shall allow a user to view boards they participate in.

REQ-ACC-009: The system shall allow a user to view their route ascent history.

REQ-ACC-010: The system shall allow a user to view their route attempt history.

REQ-ACC-011: The system shall allow a user to create and manage private notes associated with routes.

REQ-ACC-012: The system shall allow a user to create and manage private notes associated with ascents.

REQ-ACC-013: The system shall allow users to establish friend or connection relationships.

REQ-ACC-014: The system shall allow a user to view their friends or connections.

### 3.2 Board Creation And Management

REQ-BRD-001: The system shall allow an authenticated user to create a board.

REQ-BRD-002: The system shall require each board to have a name.

REQ-BRD-003: The system shall require each board to have a source wall image before it can be published.

REQ-BRD-004: The system shall store the board source image in a form that can be rendered consistently across supported clients.

REQ-BRD-005: The system shall allow a Board Admin to replace a board source image before publication.

REQ-BRD-006: The system shall allow a Board Admin to edit board metadata.

REQ-BRD-007: The system shall allow a Board Owner to assign Board Admins.

REQ-BRD-008: The system shall allow a Board Owner to remove Board Admins.

REQ-BRD-009: The system shall support board visibility settings.

REQ-BRD-010: The system shall support at least public and private board visibility states.

REQ-BRD-011: The system shall allow a Board Admin to publish a board when required board data is complete.

REQ-BRD-012: The system shall prevent publication when required board data is incomplete.

REQ-BRD-013: The system shall allow a Board Admin to unpublish or disable a board.

REQ-BRD-014: The system shall allow users to participate in boards according to board visibility and permission settings.

REQ-BRD-015: The system shall allow users to leave or unsubscribe from participating boards when permitted.

### 3.3 Board Discovery

REQ-DIS-001: The system shall provide a way to find discoverable boards.

REQ-DIS-002: The system shall allow users to search boards by board name.

REQ-DIS-003: The system shall allow discoverable boards to expose summary metadata.

REQ-DIS-004: The system shall not expose private boards through public discovery.

REQ-DIS-005: The system shall allow users to open a board detail view from discovery results.

REQ-DIS-006: The system shall support a shareable identifier or link for a board.

REQ-DIS-007: The system shall allow board discovery data to include optional location or context metadata when provided by the Board Admin.

REQ-DIS-008: The system shall allow Board Admins to omit precise location data from board discovery.

### 3.4 Hold Outlining

REQ-HLD-001: The system shall allow a Board Admin to create a hold outline on a board image.

REQ-HLD-002: The system shall allow a Board Admin to edit an existing hold outline.

REQ-HLD-003: The system shall allow a Board Admin to delete a hold outline.

REQ-HLD-004: The system shall assign a stable identifier to each hold.

REQ-HLD-005: The system shall preserve hold identifiers when a hold outline is edited.

REQ-HLD-006: The system shall allow hold outlines to be rendered over the board source image.

REQ-HLD-007: The system shall allow users to select holds from the interactive board view.

REQ-HLD-008: The system shall store hold outline geometry with sufficient precision to support route creation and future editing.

REQ-HLD-009: The system shall support overlapping hold outlines.

REQ-HLD-010: The system shall allow a Board Admin to assign optional hold metadata.

REQ-HLD-011: Hold metadata should include hold color when known.

~~REQ-HLD-012: Hold metadata should include hold type when known.~~

REQ-HLD-013: The system shall provide zoom and pan while editing hold outlines.

REQ-HLD-014: The system shall provide undo and redo for hold-editing operations.

REQ-HLD-015: The system shall allow a Board Admin to save hold-editing progress before publication.

REQ-HLD-016: The system shall validate hold data before board publication.

REQ-HLD-017: Validation shall identify holds with invalid outline geometry.

REQ-HLD-018: Validation shall identify ambiguous overlapping outlines when they are not explicitly marked as stacked or related.

### 3.5 Assisted Hold Editing

REQ-AHE-001: The system shall provide tools that reduce the amount of fully manual hold tracing required.

REQ-AHE-002: The system shall provide a freehand outline tool.

REQ-AHE-003: The system shall provide a polygon outline tool.

REQ-AHE-004: The system shall provide a brush or region-selection tool.

REQ-AHE-005: The system should provide assisted boundary detection for candidate hold edges.

REQ-AHE-006: The system should provide snapping or refinement behavior for outline edges.

REQ-AHE-007: The system should allow a Board Admin to duplicate an existing hold outline.

REQ-AHE-008: The system should allow bulk assignment of shared hold metadata.

REQ-AHE-009: The system shall allow a Board Admin to accept, reject, or manually correct assisted outlining results.

REQ-AHE-010: The system shall not publish automatically generated or assisted hold outlines without user confirmation.

### 3.6 Stacked Holds

REQ-STK-001: The system shall allow a Board Admin to mark a hold as stacked.

REQ-STK-002: The system shall allow a Board Admin to define a relationship between stacked holds.

REQ-STK-003: The system shall allow stacked holds to retain separate hold identities.

REQ-STK-004: The system shall allow stacked holds to be selected independently during route creation when appropriate.

REQ-STK-005: The system shall provide a way to distinguish stacked holds visually in board editing mode.

REQ-STK-006: The system shall preserve stacked-hold relationships when hold outlines are edited.

REQ-STK-007: The system shall prevent deletion of a stacked-hold relationship from deleting the underlying holds unless the Board Admin explicitly deletes the holds.

REQ-STK-008: The system shall include stacked-hold relationship data when rendering routes that use stacked holds.

### 3.7 Interactive Board

REQ-IBD-001: The system shall render a board image with interactive hold overlays.

REQ-IBD-002: The system shall allow users to zoom and pan the interactive board.

REQ-IBD-003: The system shall allow users to select and deselect holds when creating or viewing a route.

REQ-IBD-004: The system shall provide visual states for selected holds.

REQ-IBD-005: The system shall provide visual states for route hold roles.

REQ-IBD-006: The system shall render route overlays without permanently modifying the board source image.

REQ-IBD-007: The system shall preserve interaction accuracy between hold overlays and the underlying board image across supported screen sizes.

### 3.8 Route Creation And Management

REQ-RTE-001: The system shall allow a permitted user to create a route on a board.

REQ-RTE-002: The system shall require each route to belong to exactly one board.

REQ-RTE-003: The system shall require each route to have a creator.

REQ-RTE-004: The system shall allow a route creator to name a route.

REQ-RTE-005: The system shall allow a route creator to select holds for a route.

REQ-RTE-006: The system shall allow a route creator to assign route hold roles.

REQ-RTE-007: The system shall support a start hold role.

REQ-RTE-008: The system shall support a finish hold role.

REQ-RTE-009: The system shall support a hand-or-foot hold role.

REQ-RTE-010: The system shall support a foot-only hold role.

REQ-RTE-011: The system shall allow a route creator to propose an initial V-scale grade.

REQ-RTE-012: The system shall allow a route creator to add route description or beta text.

REQ-RTE-013: The system shall allow a route creator to save a route as a draft.

REQ-RTE-014: The system shall allow a route creator to publish a route.

REQ-RTE-015: The system shall prevent route publication when required route data is incomplete.

REQ-RTE-016: The system shall allow permitted users to edit routes.

REQ-RTE-017: The system shall allow permitted users to delete or archive routes.

REQ-RTE-018: The system shall allow users to browse routes on a board.

REQ-RTE-019: The system shall allow users to open a route detail view.

### 3.9 Ascent And Attempt Logging

REQ-ASC-001: The system shall allow an authenticated user to log an ascent for a route.

REQ-ASC-002: The system shall allow an authenticated user to log an attempt for a route.

REQ-ASC-003: The system shall associate each ascent with one user and one route.

REQ-ASC-004: The system shall associate each attempt with one user and one route.

REQ-ASC-005: The system shall allow a user to record the date of an ascent.

REQ-ASC-006: The system shall allow a user to record the date of an attempt.

REQ-ASC-007: The system shall allow a user to record number of attempts for an ascent when applicable.

REQ-ASC-008: The system shall allow a user to add private notes to an ascent.

REQ-ASC-009: The system shall allow a user to add private notes to an attempt.

REQ-ASC-010: The system shall allow a user to propose a V-scale grade when logging an ascent.

REQ-ASC-011: The system should allow a user to propose a V-scale grade when logging an attempt.

REQ-ASC-012: The system shall allow a user to edit their own ascent log.

REQ-ASC-013: The system shall allow a user to edit their own attempt log.

REQ-ASC-014: The system shall allow a user to delete their own ascent log.

REQ-ASC-015: The system shall allow a user to delete their own attempt log.

REQ-ASC-016: The system shall display ascent count for a route.

REQ-ASC-017: The system should display attempt count for a route when available.

### 3.10 Grade Aggregation

REQ-GRD-001: The system shall store the setter-proposed grade separately from community grade data.

REQ-GRD-002: The system shall store user grade proposals associated with ascents.

REQ-GRD-003: The system shall support V-scale grade values.

REQ-GRD-004: The system shall calculate a community grade from user grade proposals.

REQ-GRD-005: The system shall avoid changing the displayed community grade based on a single outlier proposal when multiple proposals exist.

REQ-GRD-006: The system shall handle low-sample routes without presenting excessive confidence.

REQ-GRD-007: The system shall preserve the raw grade proposal history needed to recalculate community grade.

REQ-GRD-008: The system should expose a confidence or sample-size indicator for community grade.

REQ-GRD-009: The system should reduce the effect of sandbagging and grade inflation.

REQ-GRD-010: The system shall display setter grade and community grade as separate values when both are available.

### 3.11 Dashboard And History

REQ-HIS-001: The system shall allow a user to view a chronological list of their ascents.

REQ-HIS-002: The system shall allow a user to view a chronological list of their attempts.

REQ-HIS-003: The system should display ascent grades in the history view.

REQ-HIS-004: The system should display board and route names in the history view.

REQ-HIS-005: The system should provide a timeline view of ascents.

REQ-HIS-006: The system should provide grade distribution over time.

REQ-HIS-007: The system should provide indicators of climbing progress over time.

REQ-HIS-008: The system shall avoid representing grade trends as exact measures of user ability.

## 4. Data Requirements

### 4.1 Core Entities

REQ-DAT-001: The system shall persist user account records.

REQ-DAT-002: The system shall persist board records.

REQ-DAT-003: The system shall persist board membership or participation records.

REQ-DAT-004: The system shall persist board role assignments.

REQ-DAT-005: The system shall persist board source image references.

REQ-DAT-006: The system shall persist hold records.

REQ-DAT-007: The system shall persist hold outline geometry.

REQ-DAT-008: The system shall persist stacked-hold relationships.

REQ-DAT-009: The system shall persist route records.

REQ-DAT-010: The system shall persist route hold assignments.

REQ-DAT-011: The system shall persist ascent records.

REQ-DAT-012: The system shall persist attempt records.

REQ-DAT-013: The system shall persist grade proposals.

REQ-DAT-014: The system shall persist route notes.

REQ-DAT-015: The system shall persist friendship or connection records.

### 4.2 Audit And Ownership

REQ-DAT-016: The system shall store creation timestamps for user-generated records.

REQ-DAT-017: The system shall store update timestamps for mutable user-generated records.

REQ-DAT-018: The system shall store creator ownership for boards.

REQ-DAT-019: The system shall store creator ownership for routes.

REQ-DAT-020: The system shall store creator ownership for ascents, attempts, and notes.

## 5. Permission Requirements

REQ-PER-001: The system shall enforce board permissions for board editing.

REQ-PER-002: The system shall enforce board permissions for hold editing.

REQ-PER-003: The system shall enforce board permissions for route creation.

REQ-PER-004: The system shall enforce ownership permissions for private notes.

REQ-PER-005: The system shall prevent non-admin users from changing board visibility.

REQ-PER-006: The system shall prevent non-admin users from changing board roles.

REQ-PER-007: The system shall prevent unauthorized users from viewing private boards.

REQ-PER-008: The system shall prevent unauthorized users from interacting with private boards.

## 6. Nonfunctional Requirements

### 6.1 Usability

REQ-NFR-USE-001: The hold-editing workflow shall support efficient editing on touch devices.

REQ-NFR-USE-002: The interactive board shall remain usable on mobile phone screen sizes.

REQ-NFR-USE-003: The system shall provide clear visual feedback for selected holds and route roles.

REQ-NFR-USE-004: The system shall provide recoverability for destructive editing actions through confirmation, undo, or both.

### 6.2 Performance

REQ-NFR-PER-001: Board rendering should remain responsive for boards with hundreds of holds.

REQ-NFR-PER-002: Hold selection should respond without noticeable delay during normal interaction.

REQ-NFR-PER-003: Hold editing tools should remain responsive while zooming and panning.

REQ-NFR-PER-004: The system should avoid unnecessary full-image reprocessing during ordinary route creation.

### 6.3 Reliability

REQ-NFR-REL-001: The system shall not lose saved hold-editing progress after app restart.

REQ-NFR-REL-002: The system shall not lose saved route drafts after app restart.

REQ-NFR-REL-003: The system shall handle interrupted network requests without corrupting board, hold, route, ascent, or grade data.

REQ-NFR-REL-004: The system shall preserve referential integrity between boards, holds, routes, and ascents.

### 6.4 Security And Privacy

REQ-NFR-SEC-001: The system shall protect authenticated user sessions according to platform best practices.

REQ-NFR-SEC-002: The system shall not expose private notes to other users.

REQ-NFR-SEC-003: The system shall not expose private board data to unauthorized users.

REQ-NFR-SEC-004: The system shall not store private server credentials in client-exposed environment variables.

REQ-NFR-SEC-005: The system shall enforce authorization on server-side data access, not only in the client UI.

### 6.5 Compatibility

REQ-NFR-CMP-001: The system shall support iOS and Android through Expo React Native.

REQ-NFR-CMP-002: The system should support web where practical.

REQ-NFR-CMP-003: Board image and hold coordinate data shall be represented in a device-independent coordinate system.

## 7. Acceptance Criteria

### 7.1 Board Creation Acceptance Criteria

AC-BRD-001: Given an authenticated user, when they create a board with a name and source image, then the board is saved and visible in their owned boards.

AC-BRD-002: Given a board without a source image, when an admin attempts to publish it, then the system prevents publication and identifies the missing requirement.

AC-BRD-003: Given a private board, when an unauthorized user searches for boards, then the private board is not included in discovery results.

### 7.2 Hold Editing Acceptance Criteria

AC-HLD-001: Given a board image, when an admin creates a hold outline, then the outline appears over the image and can be selected.

AC-HLD-002: Given an existing hold, when an admin edits its outline, then the hold keeps the same identifier.

AC-HLD-003: Given overlapping holds, when an admin marks them as stacked, then the system stores a relationship between the holds.

AC-HLD-004: Given a stacked-hold relationship, when one hold outline is edited, then the relationship remains intact.

### 7.3 Route Acceptance Criteria

AC-RTE-001: Given a published board with holds, when a permitted user creates a route with required hold roles and publishes it, then other permitted users can view the route.

AC-RTE-002: Given a route missing required data, when the creator attempts to publish it, then the system prevents publication and identifies the missing data.

AC-RTE-003: Given a route using a stacked hold, when the route is displayed, then the selected stacked hold is distinguishable from related stacked holds.

### 7.4 Ascent Acceptance Criteria

AC-ASC-001: Given an authenticated user and a published route, when the user logs an ascent, then the ascent appears in their history.

AC-ASC-002: Given an ascent with a grade proposal, when the ascent is saved, then the grade proposal is available to the community grade calculation.

AC-ASC-003: Given a user with a private ascent note, when another user views the route, then the private note is not visible.

### 7.5 Grade Aggregation Acceptance Criteria

AC-GRD-001: Given a route with only a setter grade and no ascent grade proposals, then the system displays the setter grade without presenting it as community consensus.

AC-GRD-002: Given multiple grade proposals with one extreme outlier, then the community grade calculation does not shift solely to the outlier.

AC-GRD-003: Given enough grade proposals for a route, then the system displays a community grade separately from the setter grade.

## 8. Open Requirements Questions

REQ-OPEN-001: Define the exact permission model for route creation on public boards.

REQ-OPEN-002: Define whether grade proposals should be accepted from attempts, ascents, or both.

REQ-OPEN-003: Define how repeat ascents affect grade aggregation.

REQ-OPEN-004: Define the minimum required hold data for board publication.

REQ-OPEN-005: Define the exact visual model for stacked holds in route creation and route viewing.

REQ-OPEN-006: Define which board metadata fields are required for discovery.

REQ-OPEN-007: Define how friend relationships affect board, route, or ascent visibility.

REQ-OPEN-008: Define whether route notes can be public, private, or both.

REQ-OPEN-009: Define the initial grade aggregation algorithm.

REQ-OPEN-010: Define image storage, compression, and maximum upload requirements.
