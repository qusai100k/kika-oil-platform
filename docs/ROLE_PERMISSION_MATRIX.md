# Role Permission Matrix

| Area | Store Owner | Admin | Content Manager | Order Manager | Super Admin |
|---|---:|---:|---:|---:|---:|
| Dashboard | Yes | Yes | Yes | Yes | Yes |
| Products/content | Yes | Yes | Yes | No | Yes |
| Inventory read | Yes | Yes | Yes | Yes | Yes |
| Inventory adjust | Yes | Yes | No | Yes | Yes |
| Orders/payment | Yes | Yes | No | Yes | Yes |
| Coupons/customers | Yes | Yes | No | Customer summary | Yes |
| Settings/analytics/audit | Yes | Yes | No | No | Yes |
| Team roles | No | No | No | No | Yes |

`CUSTOMER` and `SPECIALIST` have no admin permissions. Server checks are authoritative.
