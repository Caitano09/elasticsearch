import { Client }  from '@elastic/elasticsearch'


function getClient(){
    const client = new Client({
        node: 'http://localhost:9200',        
    })
    return client
}

export default getClient
