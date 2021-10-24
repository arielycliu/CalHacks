import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

async function addItem(request, thestatus, room, patient, date, nurse) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
	  
      properties: {
        Request: { 
          title:[
			{
              "text": { "content": request },
            }
          ],			  
        },
		Status: {
		  "type": "multi_select",
		  "multi_select": [{name: thestatus}]
		},
		Room: {
		  "type": "number",
		  "number": room
		},
		Patient: {
		  "type": "multi_select",
		  "multi_select": [{name: patient}]
		},
		Dates: {
		  "type": "date",
		  "date": { "start": "2021-10-23" }
		},
		Nurse: {
		  "type": "multi_select",
		  "multi_select": [{name: nurse}]
		}		
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

addItem("Pillows aren't soft enough", "Less Urgent", 145, "Ms.Apple", "Oct 23", "Ariel Liu")