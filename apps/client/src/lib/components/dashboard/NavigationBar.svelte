<script>
  import { TabAnchor, TabGroup } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
</script>

<TabGroup justify="justify-center">
  <TabAnchor href="/dashboard/assignment" selected={$page.url.pathname === "/dashboard/assignment"}>บทเรียน</TabAnchor>
  <TabAnchor href="/dashboard/reserved-computer" selected={$page.url.pathname === "/dashboard/reserved-computer"}>
    การจองคอม
  </TabAnchor>
  <TabAnchor href="/dashboard/payment" selected={$page.url.pathname === "/dashboard/payment"}>ชำระเงิน</TabAnchor>
</TabGroup>
