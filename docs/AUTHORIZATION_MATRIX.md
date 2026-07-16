# Authorization Matrix

| Capability | Customer | Staff roles | Public |
|---|---:|---:|---:|
| Register as CUSTOMER | Yes | No public role assignment | Yes |
| View own account | Yes | Own account only | No |
| Edit own profile/address | Yes | Own account only | No |
| Change own password | Yes | Yes | No |
| Assign roles | No | Future admin scope | No |
| Admin/specialist dashboard | Future | Future | No |

Every account read and mutation checks the server session. Address update/default/delete queries include the session user ID, preventing IDOR.
