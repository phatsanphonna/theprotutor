<script>
  import { TabAnchor, TabGroup } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
</script>

<TabGroup justify="justify-center">
  <TabAnchor
    href="/dashboard/assignments"
    selected={$page.url.pathname === "/dashboard/assignments"}
    >บทเรียน</TabAnchor
  >
  <TabAnchor
    href="/dashboard/appointments"
    selected={$page.url.pathname === "/dashboard/appointments"}
  >
    เรียนชดเชย
  </TabAnchor>
  <TabAnchor
    href="/dashboard/payment"
    selected={$page.url.pathname === "/dashboard/payment"}>ชำระเงิน</TabAnchor
  >
</TabGroup>
