import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

async function addItem(Name, email, person) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
	  
      properties: {
        Name: { 
          title:[
			{
              "text": { "content": Name },
            }
          ],			  
        },
		Email: {
		  "type": "email",
		  "email": email
		},
		Person: {
		  "type": "person",
		  "person": person
		}
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

addItem("Request1", "ariel.liu@gmail.com", null)