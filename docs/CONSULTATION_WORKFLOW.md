# Human Consultation Workflow

All commercial, professional, privacy, retention, emergency, and cancellation policies are open.

| Stage | Draft workflow | Approval needed |
|---|---|---|
| Onboarding | Owner invites specialist; specialist provides public profile, service scope, timezone, and minimum evidence | Owner + legal |
| Verification | Independent authorized reviewer verifies qualification/source/expiry; records status; no self-verification | Owner + specialist governance + legal |
| Availability | Specialist defines timezone, working windows, exceptions, buffer, lead time, and horizon | Owner + specialist |
| Slot duration | One or more controlled durations and optional buffer; no arbitrary customer duration | Owner + specialist |
| Booking | Customer chooses verified specialist/slot, supplies minimum reason, accepts policies, chooses assessment-sharing consent | Owner + legal/privacy |
| Payment | Status is not-required/pending/paid/failed/refunded per selected model; booking hold expiry is explicit | Owner; provider later |
| Confirmation | Reserve atomically; send reference, local date/time, timezone, method, policy, non-emergency notice | Owner + legal |
| Reminder | Configurable reminders with no sensitive detail on insecure channels | Owner + privacy |
| Reschedule | Enforce notice window, slot availability, acceptance/payment difference, and attempt limits | Owner |
| Cancellation | Actor/reason/deadline determines slot release, fee/refund, and notification | Owner + legal |
| No-show | Record customer/specialist no-show and apply approved fee/rebooking/escalation | Owner + legal |
| Consultation | Specialist accesses only assigned booking and explicitly shared assessment; use external meeting link initially | Specialist + privacy |
| Completion | Specialist marks complete and may issue an approved customer-visible summary/follow-up | Specialist + legal |
| Private notes | Separate, restricted notes; no routine owner/customer access; corrections are append-only where required | Specialist + legal/privacy |
| Access | Assignment + role + active booking/context + consent; access logged | Privacy/security |
| Retention | Separate periods for booking facts, payments, shared assessment, private notes, verification evidence | Legal/privacy + owner |

## State model (draft)

`DRAFT → HELD → PENDING_PAYMENT/CONFIRMED → COMPLETED` with controlled branches to `CANCELLED`, `RESCHEDULED`, `NO_SHOW`, `PAYMENT_FAILED`, and `REFUNDED`. Exact transitions and whether payment is required remain open.

## Safety boundary

The service must state that it is not an emergency channel. Any urgent-care wording, professional scope, record duty, and mandatory escalation requires jurisdiction-specific professional/legal review.

