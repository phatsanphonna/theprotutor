<script>
  import { TabAnchor, TabGroup } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
</script>

<TabGroup justify="justify-center">
  <TabAnchor href="/dashboard/assignment" selected={$page.url.pathname === "/dashboard/assignment"}>คอร์สเรียน</TabAnchor>
  <TabAnchor href="/dashboard/reserve-computer" selected={$page.url.pathname === "/dashboard/reserve-computer"}>
    จองคอม
  </TabAnchor>
  <TabAnchor href="/dashboard/payment" selected={$page.url.pathname === "/dashboard/payment"}>ชำระเงิน</TabAnchor>
</TabGroup>
