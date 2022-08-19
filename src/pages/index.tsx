import type { NextPage } from "next";
import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IOng, ongService } from "../shared/service/api/ong/Ong";

const Home: NextPage = () => {
  const [ongs, setOngs] = useState<IOng[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ongService.getAllOngs().then((ongs) => {
      if (ongs) {
        setOngs(ongs);
      }
      setLoading(false);
    });
  }, []);

  return (
    <HStack>
      {ongs.map((ong) => (
        <div key={ong.id}>{ong.nome}</div>
      ))}
    </HStack>
  );
};

export default Home;
