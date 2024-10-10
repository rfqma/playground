"use client";

import { Container, Grid, SimpleGrid, Text } from "@mantine/core";
import { FeaturesCard } from "@/components/mantine/FeaturesCard";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { notifications } from "@mantine/notifications";

const product = {
  id: uuidv4(),
  productName: "Tesla Model S",
  price: 250000,
  quantity: 1,
};

export default function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const order_id = searchParams.get("order_id");
    const status_code = searchParams.get("status_code");
    const transaction_status = searchParams.get("transaction_status");

    if (
      order_id !== null &&
      status_code !== null &&
      transaction_status !== null
    ) {
      notifications.show({
        withBorder: true,
        radius: "lg",
        color: "green",
        title: "Pembayaran Berhasil!",
        message: `order_id: ${order_id}, status_code: ${status_code}, transaction_status: ${transaction_status}`,
      });
    }

    const clientKey = process.env.NEXT_PUBLIC_CLIENT;

    if (clientKey === undefined) {
      throw new Error("Client key is not defined");
    }

    const snapSrc = "https://app.sandbox.midtrans.com/snap/snap.js";
    const script = document.createElement("script");
    script.src = snapSrc;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [searchParams]);

  const checkOut = async () => {
    const productData = {
      id: product.id,
      productName: product.productName,
      price: product.price,
      quantity: product.quantity,
    };

    const results = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/playground/midtrans`,
      {
        method: "POST",
        body: JSON.stringify(productData),
      }
    );

    const data = await results.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).snap.pay(data.data.token);
  };

  return (
    <Container mb={100}>
      <Text size="md" fw={500} mb={20}>
        Simulate{" "}
        <Text c="blue" fs="italic" component="a" href="https://midtrans.com/id">
          {" "}
          Midtrans
        </Text>{" "}
        Payment Gateway
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 1 }} spacing="md">
        <FeaturesCard on_click={checkOut} />
        <Grid gutter="md">
          {/* <Grid.Col></Grid.Col> */}
          {/* <Grid.Col span={6}>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col> */}
        </Grid>
      </SimpleGrid>
      <Alert
        variant="light"
        color="violet"
        radius="md"
        title="Catatan"
        icon={<IconInfoCircle />}
      >
        Setelah jendela Snap Payment terbuka dengan menekan tombol{" "}
        <b>Sewa Sekarang</b>, simulasikan pembayaran dengan
        <Text
          c="blue"
          fs="italic"
          component="a"
          href="https://simulator.sandbox.midtrans.com/"
        >
          {" "}
          https://simulator.sandbox.midtrans.com/
        </Text>
      </Alert>
    </Container>
  );
}
