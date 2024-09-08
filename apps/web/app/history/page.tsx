import { BountiesHistoryList } from './bountiesHistoryList';
import styles from "./bountiesHistoryList.module.css"

// Esta es una función asíncrona que obtendría los bounties finalizados
async function getCompletedBounties() {
  // Aquí iría la lógica para obtener los bounties finalizados desde tu API o base de datos
  // Por ahora, retornamos datos de ejemplo
  return [
    { id: 1, bountyName: "Desarrollo Frontend", status: "completado", description: "Implementar la interfaz de usuario del dashboard", creator: "0x1234...5678", freelancer: "0xabcd...efgh", amount: 2.5, completedDate: new Date("2023-11-15") },
    { id: 2, bountyName: "Auditoría de Smart Contract", status: "completado", description: "Realizar una auditoría completa del smart contract principal", creator: "0x9876...5432", freelancer: "0xijkl...mnop", amount: 5.0, completedDate: new Date("2023-10-30") },
    // Añade más bounties completados según sea necesario
  ];
}

export default async function BountiesHistoryPage() {
  const completedBounties = await getCompletedBounties();

  return (
    <div className={styles.main}>
      <BountiesHistoryList bounties={completedBounties} />
    </div>
  );
}