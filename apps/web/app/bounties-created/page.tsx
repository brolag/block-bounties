import { BountiesCreatedList } from './bountiesCreatedList';
import styles from "./bountiesCreatedList.module.css"

// Esta es una función asíncrona que podría obtener los datos de los bounties
async function getBounties() {
  // Aquí iría la lógica para obtener los bounties desde tu API o base de datos
  // Por ahora, retornamos datos de ejemplo
  return [
    { id: 1, bountyName: "Proyecto A", status: "activo", description: "Descripción del proyecto A", freelancer: "0x1234...5678", amount: 1.5, deadline: new Date("2023-12-31") },
    { id: 2, bountyName: "Proyecto B", status: "inactivo", description: "Descripción del proyecto B", freelancer: "0xabcd...efgh", amount: 2.0, deadline: new Date("2024-01-15") },
    // Añade más bounties según sea necesario
  ];
}

export default async function BountiesCreatedPage() {
  const bounties = await getBounties();

  return (
    <div className={styles.main}>
      <BountiesCreatedList bounties={bounties} />
    </div>
  );
}
