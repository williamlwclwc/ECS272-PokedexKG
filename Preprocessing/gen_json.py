import json
import csv


def read_csv(csvfile, remove_forms=True):
    with open(csvfile, 'r') as f:
        reader = csv.reader(f)
        result = []
        for line in reader:
            if reader.line_num == 1:
                print(line)
                continue
            if remove_forms:
                if int(line[0]) > 9999:
                    continue
            result.append(line)
    return result

def read_pokemon_moves(csvfile, remove_forms=True):
    tuple_dict = {}
    with open(csvfile, 'r') as f:
        reader = csv.reader(f)
        result = []
        for line in reader:
            if reader.line_num == 1:
                print(line)
                continue
            if remove_forms:
                if int(line[0]) > 9999:
                    continue
            if not tuple_dict.get((line[0], line[2])):
                tuple_dict[(line[0], line[2])] = 1
                result.append([line[0], line[2]])
    return result

def write_to_json(result, outfile):
    with open(outfile, "w") as f:
        json_dict = json.dumps(result, indent=2)
        f.write(json_dict)

nodes = []
node_id = 0
links = []
link_id = 0

# nodes group(5): pokemon 0, moves 1, types 2, abilities 3, egg_groups 4
# nodes struct: id, group, attr(object)

# remove moves/abilities related to pokemon forms
moves_to_remove = {}
pokemon_moves = read_pokemon_moves("data/pokemon_moves.csv", remove_forms=False)
for pokemon_id, move_id in pokemon_moves:
    if int(pokemon_id) > 9999:
        if moves_to_remove.get(move_id) is None:
            moves_to_remove[move_id] = 0
    else:
        if moves_to_remove.get(move_id) == 0 or moves_to_remove.get(move_id) is None:
            moves_to_remove[move_id] = 1
for i in range(1, 827):
    if moves_to_remove.get(str(i)) is None:
        moves_to_remove[str(i)] = 0
abilities_to_remove = {}
pokemon_abilities = read_csv("data/pokemon_abilities.csv", remove_forms=False)
for pokemon_ability in pokemon_abilities:
    pokemon_id = pokemon_ability[0]
    ability_id = pokemon_ability[1]
    if int(pokemon_id) > 9999:
        if abilities_to_remove.get(ability_id) is None:
            abilities_to_remove[ability_id] = 0
    else:
        if abilities_to_remove.get(ability_id) == 0 or abilities_to_remove.get(ability_id) is None:
            abilities_to_remove[ability_id] = 1

def removeDict(dict_to_remove):
    list1 = []  
    list2 = []
    for k, v in dict_to_remove.items():
        if v !=1:
            list1.append(k)
            list2.append(v)
    return dict(zip(list1,list2))

moves_to_remove = removeDict(moves_to_remove)
abilities_to_remove = removeDict(abilities_to_remove)

print(moves_to_remove)
print(abilities_to_remove)

# pokemon
pokemons = read_csv("data/pokemon.csv")
id_stats = {
    '1': 'hp',
    '2': 'attack',
    '3': 'defense',
    '4': 'sp_attack',
    '5': 'sp_defense',
    '6': 'speed'
}
pokemon_stats = read_csv("data/pokemon_stats.csv")
p_id_to_node_id = {}
s_id_to_node_id = {}
for pokemon in pokemons:
    attr = {}
    attr['pokemon_id'] = pokemon[0]
    attr['name'] = pokemon[1]
    attr['height'] = pokemon[3]
    attr['weight'] = pokemon[4]
    nodes.append(
        {
            'id': node_id,
            'group': 0,
            'attr': attr
        }
    )
    p_id_to_node_id[pokemon[0]] = node_id
    s_id_to_node_id[pokemon[2]] = node_id
    node_id += 1

for stat in pokemon_stats:
    p_id = stat[0]
    stat_id = stat[1]
    stat_value = stat[2]
    nodes[p_id_to_node_id[p_id]]['attr'][id_stats[stat_id]] = stat_value

# types
types = read_csv("data/types.csv")
type_id_to_node_id = {}
for t in types:
    type_id = t[0]
    type_name = t[1]
    nodes.append(
        {
            'id': node_id,
            'group': 2,
            'attr': {
                'type_id': type_id,
                'name': type_name
            }
        }
    )
    type_id_to_node_id[type_id] = node_id
    node_id += 1
# abilities
abilities = read_csv("data/abilities.csv")
a_id_to_node_id = {}
for ability in abilities:
    ability_id = ability[0]
    ability_name = ability[1]
    if abilities_to_remove.get(ability_id) == 0:
        continue
    nodes.append(
        {
            'id': node_id,
            'group': 3,
            'attr': {
                'ability_id': ability_id,
                'name': ability_name
            }
        }
    )
    a_id_to_node_id[ability_id] = node_id
    node_id += 1
# egg_groups
egg_groups = read_csv("data/egg_groups.csv")
e_id_to_node_id = {}
for egg_group in egg_groups:
    egg_id = egg_group[0]
    egg_name = egg_group[1]
    nodes.append(
        {
            'id': node_id,
            'group': 4,
            'attr': {
                'egg_group_id': egg_id,
                'name': egg_name
            }
        }
    )
    e_id_to_node_id[egg_id] = node_id
    node_id += 1
# moves
moves = read_csv("data/moves.csv")
m_id_to_node_id = {}
for move in moves:
    move_id = move[0]
    move_name = move[1]
    move_type_id = move[3]
    power = move[4]
    pp = move[5]
    acc = move[6]
    priority = move[7]
    if moves_to_remove.get(move_id) == 0 or move_name.startswith('max-') or '--physical' in move_name or '--special' in move_name:
        continue
    m_id_to_node_id[move_id] = node_id
    nodes.append(
        {
            'id': node_id,
            'group': 1,
            'attr': {
                'move_id': move_id,
                'name': move_name,
                'move_type': nodes[type_id_to_node_id[move_type_id]]['attr']['name'],
                'power': power,
                'pp': pp,
                'accuracy': acc,
                'priority': priority
            }
        }
    )
    links.append(
        {
            'id': link_id, 
            'source': node_id,
            'target': type_id_to_node_id[move_type_id],
            'group': 2,
            'value': 3
        }
    )
    node_id += 1
    link_id += 1

# links group(5): pokemon master move 0, pokemon has type 1, move has type 2, pokemon has ability 3, pokemon belongs to egg group 4
# links struct: id, source, target, value, group
value = 3
pokemon_moves = read_pokemon_moves("data/pokemon_moves.csv")
for pokemon_id, move_id in pokemon_moves:
    if moves_to_remove.get(move_id) == 0:
        continue
    links.append(
        {
            'id': link_id,
            'source': p_id_to_node_id[pokemon_id],
            'target': m_id_to_node_id[move_id],
            'group': 0,
            'value': value
        }
    )
    link_id += 1
pokemon_types = read_csv("data/pokemon_types.csv")
for pokemon_type in pokemon_types:
    source = p_id_to_node_id[pokemon_type[0]]
    target = type_id_to_node_id[pokemon_type[1]]
    links.append(
        {
            'id': link_id,
            'source': source,
            'target': target,
            'group': 1,
            'value': value
        }
    )
    link_id += 1
    if nodes[source]['attr'].get('types'):
        nodes[source]['attr']['types'].append(nodes[target]['attr']['name'])
    else:
        nodes[source]['attr']['types'] = [nodes[target]['attr']['name']]
pokemon_abilities = read_csv("data/pokemon_abilities.csv")
for pokemon_ability in pokemon_abilities:
    if abilities_to_remove.get(pokemon_ability[1]) == 0:
        continue
    source = p_id_to_node_id[pokemon_ability[0]]
    target = a_id_to_node_id[pokemon_ability[1]]
    links.append(
        {
            'id': link_id,
            'source': source,
            'target': target,
            'group': 3,
            'value': value
        }
    )
    link_id += 1
    if nodes[source]['attr'].get('abilities'):
        nodes[source]['attr']['abilities'].append(nodes[target]['attr']['name'])
    else:
        nodes[source]['attr']['abilities'] = [nodes[target]['attr']['name']]
pokemon_egg_groups = read_csv("data/pokemon_egg_groups.csv")
for pokemon_egg in pokemon_egg_groups:
    source = p_id_to_node_id[pokemon_egg[0]]
    target = e_id_to_node_id[pokemon_egg[1]]
    links.append(
        {
            'id': link_id,
            'source': source,
            'target': target,
            'group': 4,
            'value': value
        }
    )
    link_id += 1
    if nodes[source]['attr'].get('egg_groups'):
        nodes[source]['attr']['egg_groups'].append(nodes[target]['attr']['name'])
    else:
        nodes[source]['attr']['egg_groups'] = [nodes[target]['attr']['name']]

result = {"nodes": nodes, "links": links}
write_to_json(result, "../pokedex-kg/src/assets/pokedex.json")

print("total nodes: " + str(node_id))
print("total links: " + str(link_id))
